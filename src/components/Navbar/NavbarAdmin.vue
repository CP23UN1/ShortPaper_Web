<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const store = useAuthStore()
const route = useRoute()
const router = useRouter()

const studentId = ref(store.userId)
const role = ref(store.userRole)

const logout = () => {
  try {
    store.logout()
    router.push('/login')
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {})
</script>
<template>
  <nav
    class="flex justify-between items-center p-2 bg-white rounded-lg shadow-lg"
  >
    <div>
      <RouterLink to="/admin/students">
        <img src="/images/SIT-LOGO.png" class="h-8 mr-3" />
      </RouterLink>
    </div>
    <div
      class="flex items-center space-x-7 text-bluemain font-extrabold text-sm"
    >
      <RouterLink
        :to="`/admin/students`"
        class="mx-2"
        :class="{
          'underline underline-offset-8 decoration-4':
            $route.name === 'Admin Student List' ||
            $route.name === 'Admin Student Detail' ||
            $route.name === 'Admin Add Data' ||
            $route.name === 'Admin File Details',
        }"
        ><span>โครงงานนักศึกษา</span></RouterLink
      >
      <RouterLink
        :to="`/admin/assign`"
        class="mx-2"
        :class="{
          'underline underline-offset-8 decoration-4':
            $route.name === 'Assigning Advisor',
        }"
        ><span>แต่งตั้งกรรมการ</span></RouterLink
      >
      <RouterLink
        :to="`/admin/announcements`"
        class="mx-2"
        :class="{
          'underline underline-offset-8 decoration-4':
            $route.name === 'Admin Announcement List' ||
            $route.name === 'Creating Announcement',
        }"
        ><span>จัดการประกาศ</span></RouterLink
      >
      <RouterLink
        :to="`/admin/dashboard`"
        class="mx-2"
        :class="{
          'underline underline-offset-8 decoration-4':
            $route.name === 'Admin Dashboard'
        }"
        ><span>แดชบอร์ด</span></RouterLink
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
