<script setup>
const emits = defineEmits([])
const props = defineProps({
  text: {
    type: String,
    default: 'ตกลง',
  },
})
</script>

<template>
  <div>
    <button
      type="button"
      class="text-white bg-bluebtn hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      {{ text }}
    </button>
  </div>
</template>

<style></style>
