<script setup>
const emits = defineEmits([])
const props = defineProps({
  text: {
    type: String,
    default: 'ตกลง',
  },
  typeButton: {
    type: String,
    default: 'button',
  },
  className: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <button
    :type="typeButton"
    :class="className"
    class="text-white bg-bluebtn hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
  >
    {{ text }}
  </button>
</template>

<style></style>
