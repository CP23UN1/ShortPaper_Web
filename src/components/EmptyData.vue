<script setup>
const emits = defineEmits([])
const props = defineProps({
  message: {
    type: String,
    default: 'ไม่มีข้อมูล',
  },
})
</script>

<template>
  <div class="text-center">
    <h1 class="text-lg font-bold text-bluemain bg-slate-200 p-4 rounded-lg">
      {{ message }}
    </h1>
  </div>
</template>

<style></style>
