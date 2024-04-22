<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useValidateStore } from '../stores/validate'
import { useRoute, useRouter } from 'vue-router'
import { Modal } from 'flowbite'

import ButtonMain from '../components/ButtonMain.vue'
import AlertModal from '../components/Alert/AlertModal.vue'
import apiService from '../composables/apiService'

const authStore = useAuthStore()
const router = useRouter()

const username = ref()
const password = ref()

const validateData = () => {
  let isValid = true

  if (!username.value) {
    showAlertModal('กรุณาใส่ชื่อผู้ใช้')
    isValid = false
  }

  if (!password.value) {
    showAlertModal('กรุณาใส่รหัสผ่าน')
    isValid = false
  }

  return isValid
}

const login = async () => {
  try {
    if (validateData()) {
      await authStore.login({
        username: username.value,
        password: password.value,
      })
      if (authStore.isLoggedIn == true) {
        const userId = ref(authStore.userId)
        switch (authStore.userRole) {
          case 'student':
            const res = await apiService.getStudentById(userId.value)
            const status = res.data.data.status

            if (status == 'new') {
              router.push('/new')
            } else {
              router.push('/')
            }
            break
          case 'committee':
            router.push('/committee/students')
            break
          case 'admin':
            router.push('/admin/students')
            break
          default:
            router.push('/')
        }
      } else {
        showAlertModal('ชื่อผู้ใช้ หรือรหัสผ่านไม่ถูกต้อง')
      }
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      const alertMessage = error.response.data.message
      showAlertModal(alertMessage)
    } else {
      console.error('An error occurred:', error.message)
    }
  }
}

// Modal
const isModalOpen = ref(false)

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}

// Alert Modal
const isAlertModalOpen = ref(false)
const alertMessage = ref('')

const toggleAlertModal = () => {
  isAlertModalOpen.value = !isAlertModalOpen.value
}

const showAlertModal = (message) => {
  alertMessage.value = message
  isAlertModalOpen.value = true
}

// Show password
const passwordVisible = ref(false)

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value
}
</script>

<template>
  <div class="flex justify-center items-center bg-login h-screen w-screen">
    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center mx-4 md:mx-0 shadow-lg md:my-20 rounded-lg bg-white"
    >
      <div
        class="bg-cover bg-center bg-no-repeat rounded-l-md"
        style="
          background-image: url('/un1/images/kmutt-night.png');
          background-color: #f0f0f0;
          width: 400px;
          height: 500px;
        "
      ></div>
      <div>
        <div class="m-10 items-center">
          <div class="mb-4">
            <img src="/images/SIT-LOGO.png" width="200" />
            <h1 class="mt-2 font-black lg:text-lg md:text-base sm:text-sm">
              Short Paper for SIT Master's Degree Student
            </h1>
          </div>
          <div class="mb-4">
            <label for="username" class="block font-bold mb-2"
              >ชื่อผู้ใช้</label
            >
            <input
              type="text"
              id="username"
              v-model="username"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 border-gray-400 leading-tight focus:outline-none focus:shadow-outline xl:text-lg lg:text-base md:text-sm sm:text-xs"
              placeholder="ชื่อผู้ใช้"
              required
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block font-bold mb-2">รหัสผ่าน</label>
            <div class="relative">
              <input
                :type="passwordVisible ? 'text' : 'password'"
                id="password"
                v-model="password"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 border-gray-400 leading-tight focus:outline-none focus:shadow-outline xl:text-lg lg:text-base md:text-sm sm:text-xs"
                placeholder="รหัสผ่าน"
                required
              />
              <button
                @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 focus:outline-none"
              >
                <svg
                  v-if="passwordVisible"
                  class="w-5 h-5 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  /></svg
                ><svg
                  v-else
                  class="w-5 h-5 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-width="2"
                    d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                  />
                  <path
                    stroke="currentColor"
                    stroke-width="2"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <hr class="my-5 text-black" />
          <div class="flex justify-center items-center">
            <ButtonMain
              type-button="submit"
              class="w-52 bg-correct text-white hover:bg-white hover:text-correct outline outline-2 outline-correct"
              text="เข้าสู่ระบบ"
              @click="login"
            />
          </div>
          <p
            class="underline text-center cursor-pointer mt-5 text-bluemain hover:no-underline"
            @click="toggleModal"
          >
            กำหนดการ และขั้นตอนการอัปโหลด
          </p>
        </div>
      </div>
    </div>
  </div>

  <div
    class="fixed top-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50"
    :class="{ hidden: !isModalOpen }"
    id="description-modal"
  >
    <div class="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <div class="mb-4 flex justify-end">
        <button type="button" class="" @click="toggleModal">
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span class="sr-only">ปิดหน้าต่าง</span>
        </button>
      </div>
      <div class="mt-[-22px]">
        <div class="mb-4">
          <h1 class="text-bluemain font-black">กำหนดการ</h1>
          <ol>
            <li>
              1. ถ้าไม่ส่ง IS Report
              ตามกําหนดการที่อาจารย์ผู้สอนกําหนดครั้งเป็นต้นไป
              กรรมการสงวนสิทธิ์ในการอ่าน นักศึกษาอาจต้องลงทะเบียนเรียนใหม่
            </li>
            <li>
              2. การอัปโหลดแต่ละครั้งให้แนบสรุปประเด็นที่ต้องแก้ไขครั้งก่อนด้วย
            </li>
          </ol>
        </div>

        <div>
          <h1 class="text-bluemain font-black">ขั้นตอนการอัปโหลด IS Report</h1>
          <ol>
            <li>
              1. อัปโหลดไฟล์นามสกุล pdf เท่านั้น โดยตั้งชื่อไฟล์ตามรหัสนักศึกษา
              เช่น 6644xxxxxxx.pdf เป็นต้น
            </li>
            <li>
              2. ให้รวมไฟล์ให้อยู่ในรูปแบบไฟล์เดียว ไม่ต้องแยกบท หรือเนื้อหา
            </li>
            <li>
              3. ตรวจสอบอีเมล และเบอร์โทรศัพท์ว่าถูกต้องหรือไม่
              เนื่องจากความเห็น IS Report จะส่งกลับทางอีเมล
            </li>
            <li>
              4. ถ้าต้องการเปลี่ยนแปลงแก้ไขอีเมล หรือเบอร์โทรศัพท์สามารถ
              แก้ไขได้ที่หน้าแก้ไขข้อมูล
            </li>
            <li>
              5. ถ้าไม่สามารถอัปโหลดไฟล์ หรือใช้งานระบบไม่ได้ ให้ส่งไฟล์ IS
              Report มาที่ webadmin@sit.kmutt.ac.th พร้อมทั้งแจ้งอีเมล
              และเบอร์โทร ติดต่อกลับ
            </li>
            <li>
              6. ในการเข้าใช้งานระบบเป็นครั้งแรก ให้นักศึกษากรอกข้อมูลส่วนตัว
              และข้อมูลของโครงงานให้ครบถ้วน
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>

  <AlertModal
    :alertMessage="alertMessage"
    :is-alert-modal-open="isAlertModalOpen"
    status="error"
    @toggle="toggleAlertModal"
  />
</template>

<style></style>
