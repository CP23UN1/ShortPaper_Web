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
const password = ref()

const isModalOpen = ref(false)
let modalInstance = null

const validateData = () => {
  let isValid = true

  if (!email.value && !validateStore.validateEmail(email.value)) {
    alert('กรุณาใส่อีเมลที่ถูกต้อง')
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
      await authStore.login({ email: email.value, password: password.value })
      if (authStore.isLoggedIn == true) {
        //toggleModal()
        router.push('/')
      }
      if (authStore.isPasswordWrong == true) {
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
  <div class="flex justify-center">
    <div
    class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center mx-4 md:mx-0 shadow-lg my-10 md:my-20 rounded-lg"
    >
      <div
        class="bg-cover bg-center bg-no-repeat"
        style="
          background-image: url('/images/kmutt.png');
          width: 400px;
          height: 400px;
        "
      ></div>
      <div>
        <div class="m-10 items-center">
          <div class="mb-4">
            <label for="email" class="block font-bold mb-2">อีเมล</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="อีเมล"
              required
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block font-bold mb-2">รหัสผ่าน</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="รหัสผ่าน"
              required
            />
          </div>
          <hr class="my-5" />
          <div class="flex justify-center items-center">
            <ButtonMain
              type-button="submit"
              class-name="w-52 bg-greenbtn text-white hover:bg-white hover:text-greenbtn outline outline-2 outline-greenbtn"
              text="เข้าสู่ระบบ"
            />
          </div>
          <p
            class="text-sm underline text-center cursor-pointer mt-5"
            @click="toggleModal"
          >
            กำหนดการ และขั้นตอนการอัปโหลด IS Report
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="flex justify-center">
    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center mx-4 md:mx-0 shadow-lg my-10 md:my-20 rounded-lg"
    >
      <div
        class="bg-cover bg-center bg-no-repeat"
        style="background-image: url('/images/kmutt.png'); min-height: 300px"
      ></div>
      <div class="p-6">
        <div class="mb-4">
          <label for="email" class="block font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Email"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Password"
            required
          />
        </div>
        <hr class="my-5" />
        <div class="flex justify-center">
          <ButtonMain
            type-button="submit"
            class-name="w-52 bg-green-500 text-white hover:bg-green-700 hover:text-white outline outline-2 outline-green-500"
            text="Login"
          />
        </div>
        <p
          class="text-sm underline text-center cursor-pointer mt-5"
          @click="toggleModal"
        >
          Schedule and Steps for Uploading IS Report
        </p>
      </div>
    </div>
  </div> -->

  <!-- <div class="flex items-center justify-center h-screen bg-gray-200">
    Login Form
    <div class="w-3/4">
      <div class="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-md">
        <div>
          <img
            src="/images/SIT-LOGO.png"
            alt="SIT-logo"
            width="300"
            class="mx-auto"
          />
          <hr class="border-t my-4" />
        </div>

        <form @submit.prevent="login" class="flex flex-col items-center">
          <div class="mb-4 w-full">
            <label for="email" class="block font-bold mb-2">อีเมล</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="อีเมล"
              required
            />
          </div>
          <div class="mb-6 w-full">
            <label for="password" class="block font-bold mb-2">รหัสผ่าน</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="รหัสผ่าน"
              required
            />
          </div>
          <ButtonMain
            type-button="submit"
            class-name="w-52 bg-white text-bluemain hover:bg-bluemain hover:text-white outline outline-2 outline-bluemain"
            text="เข้าสู่ระบบ"
          />
        </form>

         <div class="text-right mt-1">
          <a href="#" class="text-bluemain text-sm">Forgot Password?</a>
        </div>
        <div class="mt-4">
           <p
            class="text-sm text-bluemain underline text-center cursor-pointer"
            @click="toggleModal"
          >
            กำหนดการ และขั้นตอนการอัปโหลด IS Report
          </p> 
          <p
            class="text-sm text-bluemain underline text-center cursor-pointer"
            @click="toggleModal"
          >
            กำหนดการ และขั้นตอนการอัปโหลด IS Report
          </p>
        </div>
      </div>
    </div>
  </div>

  Description Modal
  <div
    class="fixed top-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50"
    :class="{ hidden: !isModalOpen }"
    id="description-modal"
  >
    <button
      type="button"
      class="absolute top-[17rem] right-1/3"
      @click="toggleModal"
    >
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

    <div class="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <div class="mb-4">
        <h1 class="text-bluemain font-bold">กำหนดการ</h1>
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
        <h1 class="text-bluemain font-bold">ขั้นตอนการอัปโหลด IS Report</h1>
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
  </div> -->
</template>

<style></style>
