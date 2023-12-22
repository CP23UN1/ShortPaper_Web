<script setup>
import { ref } from 'vue'
const props = defineProps({
  header: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="bg-bluemain text-white p-4 mb-3 text-lg mt-5">
    <h1>{{ header }}</h1>
  </div>
</template>

<style></style>
