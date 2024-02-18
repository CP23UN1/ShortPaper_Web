<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useValidateStore } from '../stores/validate'
import { useRoute, useRouter } from 'vue-router'

import ButtonMain from '../components/ButtonMain.vue'

const authStore = useAuthStore()
const validateStore = useValidateStore()

const route = useRoute()
const router = useRouter()

const email = ref()
const password = ref()

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
        router.push('/')
      }
    }
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <div
    class="flex flex-col lg:flex-row items-center justify-center h-screen bg-gray-200"
    style="
      background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url('/images/kmutt.png');
      background-size: cover;
    "
  >
    <!-- Left Side: Description -->
    <div class="lg:w-1/2">
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
              2. การ Upload แต่ละครั้งให้แนบสรุปประเด็นที่ต้องแก้ไขครั้งก่อนด้วย
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
              3. ตรวจสอบอีเมล และเบอร์โทรศัพท์ว่าถูกต้องหรือไม่ เนื่องจาก
              ความเห็น IS Report จะส่งกลับทางอีเมล
            </li>
            <li>
              4. ถ้าต้องการเปลี่ยนแปลงแก้ไขอีเมล หรือเบอร์โทรศัพท์ สามารถ
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

    <!-- Right Side: Login Form -->
    <div class="lg:w-1/2">
      <div class="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-md">
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
            class-name="w-52"
            text="เข้าสู่ระบบ"
          />
        </form>
        <!-- <div class="text-right mt-1">
          <a href="#" class="text-bluemain text-sm">Forgot Password?</a>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style></style>
