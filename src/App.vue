<script setup>
import { onBeforeMount, onMounted, ref, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useAuthStore } from './stores/auth'

import NavbarCommittee from './components/Navbar/NavbarCommittee.vue'
import NavbarAdmin from './components/Navbar/NavbarAdmin.vue'
import NavbarStudent from './components/Navbar/NavbarStudent.vue'

const route = useRoute()
const store = useAuthStore()
const showNavbar = ref(true)
const isMaxWidth = ref(true)

const userRole = ref(store.userRole)

onBeforeMount(async () => {
  await store.initializeAuthState()
})

watch(() => {
  if (
    route.name == 'Login' ||
    route.name == 'Home Student' ||
    route.name == 'ShortPaper File Details' ||
    route.name == 'Committee File Details' ||
    route.name == 'Admin File Details'
  ) {
    showNavbar.value = false
    isMaxWidth.value = false
  } else if (route.name == 'New Student') {
    showNavbar.value = false
    isMaxWidth.value = true
  } else {
    showNavbar.value = true
    isMaxWidth.value = true
  }
})

watch(
  () => store.userRole,
  (newValue) => {
    userRole.value = newValue
  }
)
</script>

<template>
  <div
    class="xl:text-base lg:text-sm md:text-sm sm:text-xs"
    :class="{ 'mx-14 xl:mx-32 lg:mx-28 md:mx-24 sm:mx-20': isMaxWidth }"
  >
    <template v-if="showNavbar">
      <NavbarCommittee class="mt-[20px]" v-if="userRole == 'committee'" />
      <NavbarAdmin class="mt-[20px]" v-if="userRole == 'admin'" />
      <NavbarStudent class="mt-[20px]" v-if="userRole == 'student'" />
    </template>
    <RouterView />
  </div>
</template>

<style scoped></style>
