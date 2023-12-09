<script setup>
import { RouterView } from 'vue-router'
import NavBarStudent from './components/NavBarStudent.vue';
import NavbarAdmin from './components/NavbarAdmin.vue';
import NavbarAdvisor from './components/NavbarAdvisor.vue';
import NavbarAllRole from './components/NavbarAllRole.vue';

</script>

<template>
  <NavbarAllRole />
  <!-- <NavBarStudent /> -->
  <!-- <NavbarAdmin /> -->
  <!-- <NavbarAdvisor /> -->
  <RouterView />
</template>

<style scoped></style>
