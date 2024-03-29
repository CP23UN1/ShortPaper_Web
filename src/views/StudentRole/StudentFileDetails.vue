<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

import ApiService from '../../composables/apiService'

import Header from '../../components/Header.vue'
import ButtonMain from '../../components/ButtonMain.vue'

const route = useRoute()
const router = useRouter()

const store = useAuthStore()
const studentId = ref(store.userId)

const fileTypes = ref([])
const studentFiles = ref([])
const shortpaper = ref()
const fileTypeName = ref()

const downloadIconSvg = `<svg class="w-[20px] h-[20px] text-bluemain hover:text-red-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 19">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15h.01M4 12H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-3M9.5 1v10.93m4-3.93-4 4-4-4"/>
  </svg>`

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

const getFileTypeName = (fileTypeId) => {
  const fileType = fileTypes.value.find(
    (type) => type.typeId === parseInt(fileTypeId)
  )
  return fileType ? fileType.typeName : 'Unknown' // If file type not found, return 'Unknown'
}

onMounted(async () => {
  await getFileType()
  await getFilesByStudent()
  await getShortPaper()

  fileTypeName.value = getFileTypeName(route.params.fileTypeId)
})
</script>

<template>
  <div class="my-10">
    <Header :header="fileTypeName" />
    <div class="grid grid-cols-2 text-sm my-5">
      <!-- div 1 -->
      <div class="shadow-md mx-3">
        <div
          class="text-white uppercase bg-bluemain p-2 pl-4 rounded-ss-lg rounded-se-lg"
        >
          <p>ส่งเอกสาร</p>
        </div>

        <div
          class="bg-white border-b text-gray-900 p-2 pl-4 rounded-es-lg rounded-ee-lg"
        >
          <div>
            <div class="grid grid-cols-3">
              <div class="col-span-2">
                <p class="text-start">อัปโหลด {{ fileTypeName }}</p>
              </div>
              <div class="col-span-1">
                <div class="flex justify-end" v-html="downloadIconSvg"></div>
              </div>
            </div>
            <div class="grid grid-cols-3">
              <div class="col-span-2">
                <p class="text-start">แก้ไข {{ fileTypeName }}</p>
              </div>
              <div class="col-span-1">
                <div class="flex justify-end" v-html="downloadIconSvg"></div>
              </div>
            </div>
            <div class="grid grid-cols-3">
              <div class="col-span-2">
                <p class="text-start">สถานะปัจจุบัน</p>
              </div>
              <div class="col-span-1">
                <p class="text-end">eiei</p>
              </div>
            </div>
          </div>

          <hr class="my-3" />

          <div class="flex justify-end">
            <ButtonMain
              text="ยื่นแก้ไขใบบ.1"
              class="bg-error border border-error hover:bg-white hover:text-error"
            />
          </div>
        </div>
      </div>
      <!-- div 2 -->
      <div class="shadow-md mx-3">
        <div
          class="text-white uppercase bg-bluemain p-2 pl-4 rounded-ss-lg rounded-se-lg"
        >
          <p>ส่งเอกสาร</p>
        </div>

        <div
          class="bg-white border-b text-gray-900 p-2 pl-4 rounded-es-lg rounded-ee-lg"
        >
          <div class="text-end">
            <p>อัปโหลดล่าสุดวันที่</p>
          </div>
          <div class="text-end text-login">
            <p>ไฟล์</p>
          </div>
          <!-- loop file status -->
          <div class="grid grid-cols-3">
            <div class="col-span-2">
              <p class="text-start">ใบ บ.1 ครั้งที่ 1</p>
            </div>
            <div class="col-span-1">
              <div class="flex justify-end" v-html="downloadIconSvg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- rows 2 -->
    <div class="grid grid-cols-2 text-sm my-5">
      <!-- div 1 -->
      <div class="shadow-md mx-3">
        <div
          class="text-white uppercase bg-bluemain p-2 pl-4 rounded-ss-lg rounded-se-lg"
        >
          <p>ความคิดเห็นของที่ปรึกษา และคณะกรรมการ</p>
        </div>

        <div
          class="bg-white border-b text-gray-900 p-2 pl-4 rounded-es-lg rounded-ee-lg"
        >
          <!-- loop comment -->
          <div class="text-end">
            <div class="grid grid-cols-3">
              <div class="col-span-2">
                <p class="text-start">ความคิดเห็นครั้งที่</p>
              </div>
              <div class="col-span-1">
                <p class="underline text-bluemain hover:no-underline">คลิก</p>
              </div>
            </div>
          </div>

          <!-- show advisor status -->
          <hr class="my-3" />
          <div>
            <p class="mt-3">ความคิดเห็นของที่ปรึกษา</p>
            <p>ความคิดเห็นครั้งที่ 1</p>
            <hr class="my-2" />
          </div>
          <!-- loop comments -->
          <div>
            <div class="grid grid-cols-3">
              <div class="col-span-2">
                <p>คณะกรรมการท่านที่ 1: name</p>
              </div>
              <div class="col-span-1">
                <p class="text-login">19 มกรา เวลา 12 น.</p>
              </div>
            </div>

            <div class="grid grid-cols-3">
              <div class="col-span-2">
                <p>ผลการแสดงความคิดเห็น</p>
              </div>
              <div class="col-span-1">
                <p>ผ่าน</p>
              </div>
            </div>

            <div class="grid grid-cols-3">
              <div class="col-span-2">
                <p>ความคิดเห็นเพิ่มเติม</p>
              </div>
              <div class="col-span-1">
                <p>ตรงกับความเชี่ยวชาญของอาจารย์</p>
              </div>
            </div>
            <!-- end of loop -->
          </div>
        </div>
      </div>
      <!-- div 2 -->
      <div class="grid">
        <div class="shadow-md mx-3">
          <div
            class="text-white uppercase bg-bluemain p-2 pl-4 rounded-ss-lg rounded-se-lg"
          >
            <p>คำชี้แจงของนักศึกษาต่อความเห็นครั้งที่ 1</p>
          </div>

          <div
            class="bg-white border-b text-gray-900 p-2 pl-4 rounded-es-lg rounded-ee-lg"
          >
            <label for="reply">คำชี้แจงของนักศึกษา</label>
            <textarea
              type="text"
              id="reply"
              class="mt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border-gray-300 rounded-md"
            />
            <div class="justify-end flex mt-3">
              <ButtonMain
                text="ส่ง"
                class="bg-correct text-white hover:bg-white hover:text-correct outline outline-2 outline-correct"
              />
            </div>
          </div>
        </div>
        <!-- below div 2 -->
        <div class="shadow-md m-3">
          <div
            class="text-white uppercase bg-bluemain p-2 pl-4 rounded-ss-lg rounded-se-lg"
          >
            <p>คำชี้แจงของนักศึกษาต่อความเห็นครั้งที่ 1</p>
          </div>

          <div
            class="bg-white border-b text-gray-900 p-2 pl-4 rounded-es-lg rounded-ee-lg"
          >
            <p>คำชี้แจงของนักศึกษา</p>
            <!-- get student's comment -->
            <p>ขอบคุณค่ะ</p>
            <p class="text-login text-end">วันที่</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
