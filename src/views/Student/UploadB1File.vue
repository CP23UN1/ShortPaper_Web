<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ApiService from '../../composables/apiService'

import Header from '../../components/Header.vue'
import FileInput from '../../components/FileInput.vue'
import RadioButton from '../../components/RadioButton.vue'
import ButtonMain from '../../components/ButtonMain.vue'

const route = useRoute()
const router = useRouter()
const fileTypes = ref([])
const committees = ref([]) // Add this line to store the list of committees

const shortpaperId = ref(route.query.shortpaperId)
const file = ref(null)
const typeId = ref(route.query.typeId)
const explanationVideo = ref('')
const remark = ref('')

const selectedCommittee = ref('')
const isAdvisor = ref(false)
const isPrincipal = ref(false)
const isCommittee = ref(false)

const handleFileSelected = (selectedFile) => {
  console.log('Selected file:', selectedFile)
  file.value = selectedFile
}

const handleTypeId = (id) => {
  typeId.value = id
}

const handleUpload = async () => {
  if (!file.value) {
    alert('Please select a file to upload.')
    return
  }

  console.log('shortpaperId', shortpaperId.value)
  console.log('fileTypeId', typeId.value)

  const formData = new FormData()
  formData.append('shortpaperId', shortpaperId.value)
  formData.append('file', file.value)
  formData.append('fileTypeId', typeId.value)
  formData.append('explanationVideo', explanationVideo.value)
  // formData.append('remark', remark.value)

  try {
    // Assign committee before uploading the file
    await assignCommittee()

    const res = await ApiService.uploadFile(formData)
    if (res.status === 200) {
      alert(`บันทึกสำเร็จ`)
      router.push('/files')
    } else {
      alert(`Failed to upload file. Please try again later.`)
    }
  } catch (error) {
    console.error('Error uploading file:', error)
    alert(`An error occurred while uploading the file.`)
  }
}

const getFileType = async () => {
  try {
    const res = await ApiService.getFileType()

    if (res.status === 200) {
      const data = await res.data
      fileTypes.value = data.data
    }
  } catch (error) {
    console.error('Error fetching file types:', error)
    alert(`An error occurred while fetching file types.`)
  }
}

// Function to fetch committees
const fetchCommittees = async () => {
  try {
    const response = await ApiService.getCommittees()
    if (response.status === 200) {
      committees.value = response.data // Assuming the response data is an array of committee objects with `name` property
    }
  } catch (error) {
    console.error('Error fetching committees:', error)
    alert('An error occurred while fetching committees.')
  }
}

const assignCommittee = async () => {
  if (!shortpaperId.value || !selectedCommittee.value) {
    console.error('Student ID or Committee is missing.')
    return
  }

  try {
    const response = await ApiService.updateCommitteeRolesForStudentAsync(shortpaperId.value, [{
      CommitteeName: selectedCommittee.value,
      IsAdvisor: isAdvisor.value,
      IsPrincipal: isPrincipal.value,
      IsCommittee: isCommittee.value
    }])

    if (response.IsSuccess) {
      console.log('Committee assigned successfully:', response)
    } else {
      console.error('Failed to assign committee:', response.ErrorMessage)
    }
  } catch (error) {
    console.error('Error assigning committee:', error)
    alert('An error occurred while assigning the committee.')
  }
}

onMounted(async () => {
  await getFileType()
  await fetchCommittees()
})

</script>

<template>
  <div>
    <div class="mt-5 font-semibold">
      <div class="text-bluemain text-left text-sm">
        <p>
          <RouterLink :to="'/files'">
            <span class="hover:text-blueheader">เอกสารโครงงานทั้งหมด</span>
          </RouterLink>
          >
          <span class="font-bold text-sm">อัปโหลดเอกสารโครงงาน</span>
        </p>
      </div>
    </div>

    <Header header="อัปโหลดเอกสาร" />

    <div class="relative overflow-x-auto shadow-md rounded-lg text-center">
      <div class="m-8">
        <FileInput
          label="อัปโหลดเอกสาร: "
          describe="*** เอกสารแต่งตั้งคณะกรรมการสำหรับ Upload จะต้องเป็นไฟล์ .PDF เท่านั้น ***"
          @fileSelected="handleFileSelected"
        />

        <div class="grid grid-cols-3 mt-12 ml-16 text-sm">
          <div v-for="fileType in fileTypes" :key="fileType.typeId">
            <RadioButton
              name="fileType"
              :value="fileType.typeId"
              :label="fileType.typeName"
              :isChecked="fileType.typeId == route.query.typeId"
              @change="handleTypeId(fileType.typeId)"
            />
          </div>
        </div>

        <div class="mt-8">
          <label for="committees" class="block mb-1">Select Committee:</label>
          <select id="committees" v-model="selectedCommittee" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-bluemain focus:border-bluemain">
            <option value="" disabled selected style="display: none;">Select Committee</option>
            <option v-for="committee in committees" :key="committee.id" :value="committee.id">{{ committee.firstname + ' ' + committee.lastname }}</option>
          </select>
        </div>

        <div class="mt-4">
          <input type="radio" id="advisor" v-model="role" value="Advisor" class="mr-2">
          <label for="advisor" class="font-medium">Advisor</label>
        </div>

        <div class="mt-2">
          <input type="radio" id="principal" v-model="role" value="Principal" class="mr-2">
          <label for="principal" class="font-medium">Principal</label>
        </div>

        <div class="mt-2">
          <input type="radio" id="committee" v-model="role" value="Committee" class="mr-2">
          <label for="committee" class="font-medium">Committee</label>
        </div>

        <form class="mt-8">
          <label for="input">วิดีโอคำอธิบายเพิ่มเติม</label>
          <div class="relative">
            <input
              type="text"
              id="input"
              class="inline-flex w-72 py-2 mt-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-bluemain focus:border-bluemain"
              placeholder="กรุณาแนบลิงก์"
              v-model="explanationVideo"
            />
            <ButtonMain text="บันทึก" @click="handleUpload" class="ml-3" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style></style>
