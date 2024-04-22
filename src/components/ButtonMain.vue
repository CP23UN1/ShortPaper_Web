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
    default:
      'text-white bg-bluebtn hover:bg-blue-800',
  },
})
</script>

<template>
  <button
    :type="typeButton"
    :class="className"
    class="focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 xl:text-base lg:text-sm md:text-sm sm:text-xs"
  >
    {{ text }}
  </button>
</template>

<style></style>
