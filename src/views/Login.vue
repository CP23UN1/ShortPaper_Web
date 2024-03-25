<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useValidateStore } from '../stores/validate'
import { useRoute, useRouter } from 'vue-router'
import { Modal } from 'flowbite'

import ButtonMain from '../components/ButtonMain.vue'

const authStore = useAuthStore()
const validateStore = useValidateStore()

const route = useRoute()
const router = useRouter()

const email = ref()
const username = ref()
const password = ref()

const isModalOpen = ref(false)
let modalInstance = null

const validateData = () => {
  let isValid = true

  // if (!email.value && !validateStore.validateEmail(email.value)) {
  //   alert('กรุณาใส่อีเมลที่ถูกต้อง')
  //   isValid = false
  // }

  if (!username.value) {
    alert('กรุณาใส่ชื่อผู้ใช้')
    isValid = false
  }

  if (!password.value) {
    alert('กรุณาใส่รหัสผ่าน')
    isValid = false
  }

  return isValid
}

const login = async () => {
  try {
    if (validateData()) {
      await authStore.login({ username: username.value, password: password.value })
      if (authStore.isLoggedIn == true) {
        switch (authStore.userRole) {
          case 'student':
            router.push('/')
            break
          case 'committee':
            router.push('/committee/home')
            break
          case 'admin':
            router.push('/admin/home')
            break
          default:
            router.push('/')
        }
      } else if (authStore.isPasswordWrong == true) {
        alert('กรุณาใส่รหัสผ่านที่ถูกต้อง')
      }
    }
  } catch (err) {
    console.error(err)
  }
}

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}

onMounted(() => {
  const targetEl = document.getElementById('description-modal')
  modalInstance = new Modal(targetEl)
})
</script>

<template>
  <div class="bg-login h-screen w-screen">
    <div class="flex justify-center items-center h-screen">
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center mx-4 md:mx-0 shadow-lg md:my-20 rounded-lg bg-white"
      >
        <div
          class="bg-cover bg-center bg-no-repeat rounded-l-md"
          style="
            background-image: url('/images/kmutt.png');
            width: 400px;
            height: 450px;
          "
        ></div>
        <div>
          <div class="m-10 items-center">
            <div class="mb-4">
              <img src="/public/images/SIT-LOGO.png" width="250" class="" />
              <h1 class="mt-2 font-black">
                Short Paper for SIT Master's Degree Student
              </h1>
            </div>
            <div class="mb-4">
              <label for="username" class="block font-bold mb-2 text-sm"
                >ชื่อผู้ใช้</label
              >
              <input
                type="text"
                id="username"
                v-model="username"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 border-gray-400 leading-tight focus:outline-none focus:shadow-outline text-sm"
                placeholder="ชื่อผู้ใช้"
                required
              />
            </div>
            <div class="mb-4">
              <label for="password" class="block font-bold mb-2 text-sm"
                >รหัสผ่าน</label
              >
              <input
                type="password"
                id="password"
                v-model="password"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 border-gray-400 leading-tight focus:outline-none focus:shadow-outline text-sm"
                placeholder="รหัสผ่าน"
                required
              />
            </div>
            <hr class="my-5 text-black" />
            <div class="flex justify-center items-center">
              <ButtonMain
                type-button="submit"
                class-name="w-52 bg-correct text-white hover:bg-white hover:text-correct outline outline-2 outline-correct"
                text="เข้าสู่ระบบ"
                @click="login"
              />
            </div>
            <p
              class="text-sm underline text-center cursor-pointer mt-5"
              @click="toggleModal"
            >
              กำหนดการ และขั้นตอนการอัปโหลด
            </p>
          </div>
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
            3. ตรวจสอบอีเมล และเบอร์โทรศัพท์ว่าถูกต้องหรือไม่ เนื่องจากความเห็น
            IS Report จะส่งกลับทางอีเมล
          </li>
          <li>
            4. ถ้าต้องการเปลี่ยนแปลงแก้ไขอีเมล หรือเบอร์โทรศัพท์สามารถ
            แก้ไขได้ที่หน้าแก้ไขข้อมูล
          </li>
          <li>
            5. ถ้าไม่สามารถอัปโหลดไฟล์ หรือใช้งานระบบไม่ได้ ให้ส่งไฟล์ IS Report
            มาที่ webadmin@sit.kmutt.ac.th พร้อมทั้งแจ้งอีเมล และเบอร์โทร
            ติดต่อกลับ
          </li>
          <li>
            6. ในการเข้าใช้งานระบบเป็นครั้งแรก ให้นักศึกษากรอกข้อมูลส่วนตัว
            และข้อมูลของโครงงานให้ครบถ้วน
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<style></style>
