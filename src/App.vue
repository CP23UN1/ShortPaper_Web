<script setup>
import { RouterView } from 'vue-router'
import NavBarStudent from './components/NavBarStudent.vue';
import NavbarAdmin from './components/NavbarAdmin.vue';
import NavbarAdvisor from './components/NavbarAdvisor.vue';

</script>

<template>
  <NavBarStudent />
  <!-- <NavbarAdmin />
  <NavbarAdvisor /> -->
  <RouterView />
</template>

<style scoped></style>
