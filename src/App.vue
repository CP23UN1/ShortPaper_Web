<script setup>
import { ref, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import NavbarAllRole from './components/Navbar/NavbarAllRole.vue'

const route = useRoute()
const showNavbar = ref(true)

watch(() => {
  if (route.name == 'Login') {
    showNavbar.value = false
  }else{
    showNavbar.value = true
  }
})
</script>

<template>
  <template v-if="showNavbar">
    <NavbarAllRole />
  </template>
  <RouterView />
</template>

<style scoped></style>
