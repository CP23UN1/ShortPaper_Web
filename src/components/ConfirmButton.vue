<script setup>
const emits = defineEmits([])
const props = defineProps({
  message: {
    type: String,
    default: 'บันทึก',
  },
})
</script>

<template>
  <div>
    <button
      class="text-teal-700 border border-teal-700 rounded-[4px] px-[40px] py-[5px] hover:bg-teal-700 hover:text-white"
      type="submit"
    >
      {{ message }}
    </button>
  </div>
</template>

<style></style>
