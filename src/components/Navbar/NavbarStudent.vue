<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'

const store = useAuthStore()
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
  <nav
    class="flex justify-between items-center p-2 bg-white rounded-lg shadow-lg"
  >
    <div>
      <RouterLink to="/">
        <img src="/images/SIT-LOGO.png" class="lg:h-11 md:h-9 sm:h-7 mr-3" />
      </RouterLink>
    </div>
    <div
      class="flex items-center space-x-7 text-bluemain font-extrabold xl:text-base lg:text-base md:text-sm sm:text-xs"
    >
      <RouterLink
        to="/"
        class="mx-2"
        :class="{
          'underline underline-offset-8 decoration-4':
            $route.name === 'Home Student',
        }"
        ><span>หน้าหลัก</span></RouterLink
      >
      <RouterLink
        :to="`/details`"
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
        :to="`/files`"
        class="mx-2"
        :class="{
          'underline underline-offset-8 decoration-4':
            $route.name === 'ShortPaper File' ||
            $route.name === 'Uploading ShortPaper' ||
            $route.name === 'ShortPaper File Details',
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
      <button
        class="text-error underline mx-2 hover:bg-error hover:text-white hover:no-underline rounded-lg"
        @click="logout"
      >
        ออกจากระบบ
      </button>
    </div>
  </nav>
</template>
