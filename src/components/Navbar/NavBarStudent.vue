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
    <div class="flex items-center space-x-4 text-bluemain">
      <RouterLink to="/"><span>หน้าหลัก</span></RouterLink>
      <RouterLink to="/student"><span>ข้อมูลนักศึกษา</span></RouterLink>
      <RouterLink to="/upload/b1"><span>เอกสารโครงงาน</span></RouterLink>
      <RouterLink to="/upload"><span>เอกสารโครงงานที่ผ่านมา</span></RouterLink>
      <button class="text-error underline" @click="logout">ออกจากระบบ</button>
    </div>
  </nav>
</template>
