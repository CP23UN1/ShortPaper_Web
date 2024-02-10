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
const fileTypes = ref()

const shortPaperId = ref(1)
const file = ref(null)
const choseFileTypeId = ref(route.query.id)
const explanationVideo = ref('')
const remark = ref()

const handleFileSelected = (selectedFile) => {
  console.log('Selected file:', selectedFile)
  file.value = selectedFile
}

const handleTypeId = (id) => {
  choseFileTypeId.value = id
}

const handleUpload = async () => {
  if (!file.value) {
    alert('Please select a file to upload.')
    return
  }

  const formData = new FormData()
  formData.append('shortpaperId', shortPaperId.value)
  formData.append('file', file.value)
  formData.append('fileTypeId', choseFileTypeId.value)
  formData.append('explanationVideo', explanationVideo.value)
  //formData.append('remark', remark.value)

  try {
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
  const res = await ApiService.getFileType()

  if (res.status === 200) {
    const data = await res.data
    fileTypes.value = data.data
  }
}

onMounted(async () => {
  await getFileType()
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
              :isChecked="fileType.typeId == route.query.id"
              @change="handleTypeId(fileType.typeId)"
            />
          </div>
        </div>
        <form class="mt-1">
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
