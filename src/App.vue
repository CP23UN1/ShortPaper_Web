<script setup>
import { RouterView } from 'vue-router'
import NavBarStudent from './components/Navbar/NavBarStudent.vue';
import NavbarAdmin from './components/Navbar/NavbarAdmin.vue';
import NavbarAdvisor from './components/Navbar/NavbarAdvisor.vue';
import NavbarAllRole from './components/Navbar/NavbarAllRole.vue'

</script>

<template>
  <!-- <NavbarAllRole /> -->
  <NavBarStudent />
  <!-- <NavbarAdmin /> -->
  <!-- <NavbarAdvisor /> -->
  <RouterView />
</template>

<style scoped></style>
