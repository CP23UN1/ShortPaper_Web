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
  <div class="bg-bluemain text-white p-4 mb-3 mt-5 rounded-md font-black">
    <h1>{{ header }}</h1>
  </div>
</template>

<style></style>
