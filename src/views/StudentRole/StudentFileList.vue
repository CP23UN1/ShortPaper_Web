<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

import ApiService from '../../composables/apiService'

import Header from '../../components/Header.vue'
import ButtonMain from '../../components/ButtonMain.vue'

const uploadIconSvg = `<svg class="w-[20px] h-[20px] text-bluemain hover:text-correct cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 19">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15h.01M4 12H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-3m-5.5 0V1.07M5.5 5l4-4 4 4"/>
  </svg>`

const downloadIconSvg = `<svg class="w-[20px] h-[20px] text-bluemain hover:text-correct cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 19">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15h.01M4 12H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-3M9.5 1v10.93m4-3.93-4 4-4-4"/>
  </svg>`

const doneIconSvg = `<svg class="w-[20px] h-[20px] text-teal-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
  </svg>`

const fileTypes = ref([])
const studentFiles = ref([])
const store = useAuthStore()
const studentId = ref(store.userId)
const shortpaper = ref()

const route = useRoute()
const router = useRouter()

const getFileType = async () => {
  const res = await ApiService.getFileType()

  if (res.status === 200) {
    const data = await res.data
    fileTypes.value = data.data
  }
}

const getFilesByStudent = async () => {
  const res = await ApiService.getFilesByStudent(studentId.value)

  if (res.status === 200) {
    const data = await res.data
    studentFiles.value = data.data
  }
}

const getShortPaper = async () => {
  const res = await ApiService.getShortPaper(studentId.value)
  if (res.status === 200) {
    const data = await res.data
    shortpaper.value = data.data
  }
}

const uploadPage = (fileTypeId) => {
  router.push({
    path: `/upload/${fileTypeId}`,
  })
}

const downloadFile = async (fileTypeId, fileId, filename) => {
  try {
    const res = await ApiService.downloadFile(shortpaper.value.shortpaperId, fileTypeId)
    const blob = new Blob([res.data], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')

    if (res.status === 200) {
      link.href = url
      link.download = filename
      link.style.display = 'none'

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } else {
      console.error('Failed to download file:', res.statusText)
    }
  } catch (error) {
    console.error('Error downloading file:', error)
  }
}

const getFileStatus = (typeId) => {
  const file = studentFiles.value.find(
    (file) => file.shortpaperFileType.typeId === typeId
  )
  return file ? file.status : 'ยังไม่มีการอัปโหลด'
}

const hasFile = (typeId) => {
  return studentFiles.value.some(
    (file) => file.shortpaperFileType.typeId === typeId
  )
}

const getFileIdByType = (typeId) => {
  const file = studentFiles.value.find(
    (file) => file.shortpaperFileType.typeId === typeId
  )
  return file ? file.shortpaperFileId : null
}

const getNameByStudent = (typeId) => {
  const file = studentFiles.value.find(
    (file) => file.shortpaperFileType.typeId === typeId
  )
  return file ? file.fileName : typeId
}

const mapFileStatus = (status) => {
  switch (status) {
    case 'not_approve':
      return 'ยังไม่ได้รับการอนุมัติ'
    case 'approved':
      return 'อนุมัติเรียบร้อย'
    default:
      return 'ยังไม่มีการอัปโหลด'
  }
}

onMounted(async () => {
  await getFileType()
  await getFilesByStudent()
  await getShortPaper()
})
</script>

<template>
  <div>
    <Header header="เอกสารโครงงาน" />

    <div class="relative overflow-x-auto shadow-md rounded-lg mt-6">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr class="text-center">
            <th scope="col" class="py-3">ลำดับ</th>
            <th scope="col" class="px-6 py-3">รายการ</th>
            <th scope="col" class="py-3">อัปโหลด</th>
            <th scope="col" class="px-6 py-3">สถานะ</th>
            <th scope="col" class="py-3">ดาวน์โหลด</th>
            <th scope="col" class="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr
            class="bg-white border-b hover:bg-gray-50 text-gray-900"
            v-for="fileType in fileTypes"
            :key="fileType.typeId"
          >
            <td class="py-4 font-medium whitespace-nowrap">
              {{ fileType.typeId }}
            </td>
            <td class="font-medium whitespace-nowrap">
              {{ fileType.typeName }}
            </td>
            <td class="font-medium whitespace-nowrap">
              <div
                class="flex justify-center items-center"
                v-html="uploadIconSvg"
                @click="uploadPage(fileType.typeId)"
              ></div>
            </td>
            <td class="font-medium whitespace-nowrap">
              {{ mapFileStatus(getFileStatus(fileType.typeId)) }}
            </td>
            <td class="font-medium whitespace-nowrap">
              <div
                v-if="hasFile(fileType.typeId)"
                class="flex justify-center items-center"
                v-html="downloadIconSvg"
                @click="
                  downloadFile(
                    fileType.typeId,
                    getFileIdByType(fileType.typeId),
                    getNameByStudent(fileType.typeId)
                  )
                "
              ></div>
            </td>
            <td class="font-medium whitespace-nowrap">
              <RouterLink :to="`/file/${fileType.typeId}`">
                <!-- <ButtonMain
                  text="รายละเอียด"
                  class="bg-bluemain border hover:bg-white hover:border-bluemain hover:text-bluemain"
                /> -->
                <span class="text-bluemain underline hover:no-underline">รายละเอียด</span>
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style></style>
