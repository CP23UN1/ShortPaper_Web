<script setup>
import { ref, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import NavbarAllRole from './components/Navbar/NavbarAllRole.vue'

const route = useRoute()
const showNavbar = ref(true)
const isMaxWidth = ref(true)

watch(() => {
  if (route.name == 'Login') {
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
      <NavbarAllRole />
    </template>
    <RouterView />
  </div>
</template>

<style scoped></style>
