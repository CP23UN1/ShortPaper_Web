<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import ApiService from '../../composables/apiService'

import Header from '../../components/Header.vue'
import FileInput from '../../components/FileInput.vue'
import RadioButton from '../../components/RadioButton.vue'
import ButtonMain from '../../components/ButtonMain.vue'

const route = useRoute()
const fileTypes = ref()

const link = ref()
const sendFile = () => {
  console.log(link.value)
}

const handleUpload = async (event) => {
  const file = event.target.files[0]
  const formData = new FormData()
  formData.append('file', file)

  const res = await ApiService.uploadFile(formData)
  if (res.status === 200) {
    alert(`บันทึกสำเร็จ`)
  }

  // try {
  //   const response = await axios.post('/upload', formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   });

  //   emits.upload(response.data);
  // } catch (error) {
  //   console.error('Error uploading file:', error);
  // }
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
          @upload="handleUpload"
        />

        <div class="grid grid-cols-3 mt-12 ml-16 text-sm">
          <div v-for="fileType in fileTypes" :key="fileType.typeId">
            <RadioButton
              name="fileType"
              :value="fileType.typeId"
              :label="fileType.typeName"
              :isChecked="fileType.typeId == route.query.id"
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
              v-model="link"
            />
            <ButtonMain text="บันทึก" @click="sendFile" class="ml-3" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style></style>
