<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useRoute, useRouter } from 'vue-router'

const store = useAuthStore()
const route = useRoute()
const router = useRouter()

const logout = () => {
  try {
    store.logout()
    router.push('/login')
  } catch (err) {
    console.error(err)
  }
}
</script>
<template>
  <nav class="flex justify-between items-center p-2 bg-white">
    <div>
      <RouterLink to="/">
        <img src="/images/SIT-LOGO.png" class="h-12 mr-3" />
      </RouterLink>
    </div>
    <div class="flex items-center space-x-4 text-bluemain font-extrabold">
      <RouterLink
        to="/"
        class="mx-2"
        :class="{
          'underline underline-offset-8 decoration-4': $route.name === 'Home',
        }"
        ><span>หน้าหลัก</span></RouterLink
      >
      <RouterLink
        to="/students"
        class="mx-2"
        :class="{
          'underline underline-offset-8 decoration-4':
            $route.name === 'Student List' ||
            $route.name === 'Student information' ||
            $route.name === 'Editing student information',
        }"
        ><span>ข้อมูลนักศึกษา</span></RouterLink
      >
      <RouterLink
        to="/files"
        class="mx-2"
        :class="{
          'underline underline-offset-8 decoration-4':
            $route.name === 'ShortPaper File' ||
            $route.name === 'Uploading ShortPaper',
        }"
        ><span>เอกสารโครงงาน</span></RouterLink
      >
      <RouterLink
        to="/article"
        class="mx-2"
        :class="{
          'underline underline-offset-8 decoration-4':
            $route.name === 'Article',
        }"
        ><span>เอกสารโครงงานที่ผ่านมา</span></RouterLink
      >
      <button class="text-error underline mx-2 hover:bg-error hover:text-white hover:no-underline rounded-lg" @click="logout">
        ออกจากระบบ
      </button>
    </div>
  </nav>
</template>
