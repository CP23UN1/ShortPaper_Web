<script setup>
import { ref, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import NavbarAllRole from './components/Navbar/NavbarAllRole.vue'
import NavbarAdmin from './components/Navbar/NavbarAdmin.vue'
import NavbarStudent from './components/Navbar/NavbarStudent.vue'

const route = useRoute()
const showNavbar = ref(true)
const isMaxWidth = ref(true)

watch(() => {
  if (route.name == 'Login' || route.name == 'Home Student') {
    showNavbar.value = false
    isMaxWidth.value = false
  } else {
    showNavbar.value = true
    isMaxWidth.value = true
  }
})
</script>

<template>
  <div :class="{ 'mx-14': isMaxWidth }">
    <template v-if="showNavbar">
      <!-- <NavbarAllRole /> -->
      <!-- <NavbarAdmin /> -->
      <NavbarStudent class="mt-[20px]" />
    </template>
    <RouterView />
  </div>
</template>

<style scoped></style>
