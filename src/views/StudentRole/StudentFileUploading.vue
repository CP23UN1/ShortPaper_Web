<script setup>
import { onMounted, ref, computed, watch, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

import ApiService from '../../composables/apiService'

import Header from '../../components/Header.vue'
import FileInput from '../../components/FileInput.vue'
import RadioButton from '../../components/RadioButton.vue'
import ButtonMain from '../../components/ButtonMain.vue'

const route = useRoute()
const router = useRouter()
const store = useAuthStore()
const studentId = ref(store.userId)

const shortpaperId = ref(route.params.shortpaperId)
const typeId = ref(route.params.typeId)

const fileTypes = ref([])
const committees = ref([])
const selectedRole = ref('')

const file = ref(null)
const explanationVideo = ref('')
const remark = ref('')

const selectedCommittee = ref('')
const isAdvisor = ref(false)
const isPrincipal = ref(false)
const isCommittee = ref(false)

const handleFileSelected = (selectedFile) => {
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

  const formData = new FormData()
  formData.append('shortpaperId', shortpaperId.value)
  formData.append('file', file.value)
  formData.append('fileTypeId', typeId.value)
  if (explanationVideo.value !== null) {
    formData.append('explanationVideo', explanationVideo.value)
  }
  // formData.append('remark', remark.value)

  try {
    await assignCommittee()

    const res = await ApiService.uploadFile(formData)
    if (res.status === 200) {
      alert(`บันทึกสำเร็จ`)
      router.push(`/files/${studentId.value}`)
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
const committeeName = ref()
const fetchCommittees = async () => {
  try {
    const response = await ApiService.getCommittees()
    if (response.status === 200) {
      committees.value = response.data
    }
  } catch (error) {
    console.error('Error fetching committees:', error)
    alert('An error occurred while fetching committees.')
  }
}

const assignCommittee = async () => {
  if (!shortpaperId.value || !selectedCommittee.value) {
    return
  }

  try {
    const response = await ApiService.updateCommitteeRolesForStudentAsync(
      shortpaperId.value,
      [
        {
          CommitteeName: selectedCommittee.value,
          IsAdvisor: isAdvisor.value,
          IsPrincipal: isPrincipal.value,
          IsCommittee: isCommittee.value,
        },
      ]
    )

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

onBeforeMount(async () => {
  await getFileType()
  await fetchCommittees()

  console.log('Initial Type ID:', typeId.value)
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

    <div class="shadow-lg rounded-lg text-center p-3">
      <div class="p-8">
        <FileInput
          label="อัปโหลดเอกสาร: "
          describe="*** เอกสารแต่งตั้งคณะกรรมการสำหรับ Upload จะต้องเป็นไฟล์ .PDF เท่านั้น ***"
          @fileSelected="handleFileSelected"
          @sendFile="handleUpload"
        />

        <div class="grid grid-cols-3 mt-8 text-sm ml-16">
          <div v-for="fileType in fileTypes" :key="fileType.typeId">
            <RadioButton
              name="fileType"
              :value="fileType.typeId"
              :label="fileType.typeName"
              :isChecked="fileType.typeId == route.params.typeId"
              @change="handleTypeId(fileType.typeId)"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-if="typeId == 1" class="shadow-lg rounded-lg p-3 mt-8">
      <p>เลือกอาจารย์ที่ปรึกษาสำหรับใบ บ.1</p>
      <div class="grid grid-cols-4 mt-8 text-sm ml-16">
        <div v-for="committee in committees" :key="committee.committeeId">
          <RadioButton
            name="advisor"
            :value="committee.committeeId"
            :label="committee.firstname + ' ' + committee.lastname"
          />
        </div>
      </div>
      <!-- <label for="committees" class="block mb-1">Select Committee:</label>
      <select
        id="committees"
        v-model="selectedCommittee"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-bluemain focus:border-bluemain"
      >
        <option value="" disabled selected style="display: none">
          Select Committee
        </option>
        <option
          v-for="committee in committees"
          :key="committee.id"
          :value="committee.id"
        >
          {{ committee.firstname + ' ' + committee.lastname }}
        </option>
      </select>

      <div class="mt-4">
        <input
          type="radio"
          id="advisor"
          name="role"
          v-model="selectedRole"
          value="Advisor"
          class="mr-2"
        />
        <label for="advisor" class="font-medium">Advisor</label>

        <input
          type="radio"
          id="principal"
          name="role"
          v-model="selectedRole"
          value="Principal"
          class="ml-4 mr-2"
        />
        <label for="principal" class="font-medium">Principal</label>

        <input
          type="radio"
          id="committee"
          name="role"
          v-model="selectedRole"
          value="Committee"
          class="ml-4 mr-2"
        />
        <label for="committee" class="font-medium">Committee</label>
      </div> -->
    </div>

    <div v-if="typeId == 1" class="shadow-lg rounded-lg p-3 mt-8">
      <p>เลือกอาจารย์ที่ปรึกษาร่วมสำหรับใบ บ.1</p>
      <div class="grid grid-cols-4 mt-8 text-sm ml-16">
        <div v-for="committee in committees" :key="committee.committeeId">
          <RadioButton
            name="committee"
            :value="committee.committeeId"
            :label="committee.firstname + ' ' + committee.lastname"
          />
        </div>
      </div>
    </div>

    <div class="shadow-lg rounded-lg p-3 mt-8" v-if="typeId == 5">
      <label for="input">วิดีโอคำอธิบายเพิ่มเติม</label>
      <div class="relative">
        <input
          type="text"
          id="input"
          class="inline-flex w-72 py-2 mt-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-bluemain focus:border-bluemain"
          placeholder="กรุณาแนบลิงก์"
          v-model="explanationVideo"
        />
        <!-- <ButtonMain text="บันทึก" @click="handleUpload" class="ml-3" /> -->
      </div>
    </div>
  </div>
</template>

<style></style>