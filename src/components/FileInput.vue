<script setup>
import { defineProps, defineEmits } from 'vue'

const emits = defineEmits(['fileSelected'])
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  describe: {
    type: String,
    default: '',
  },
})

const handleFileChange = (event) => {
  if (
    event &&
    event.target &&
    event.target.files &&
    event.target.files.length > 0
  ) {
    const file = event.target.files[0]
    const allowedTypes = ['application/pdf']

    if (!allowedTypes.includes(file.type)) {
      event.target.value = null
      alert('Please select a PDF file.')
      return
    }

    emits('fileSelected', file)
  } else {
    alert('Invalid file input event.')
  }
}
</script>

<template>
  <div class="justify-center items-center block">
    <label class="mb-2" for="file_input">{{ label }}</label>
    <div class="inline-flex">
      <input
        class="ml-2 w-full border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        aria-describedby="file_type"
        id="file_input"
        type="file"
        @change="handleFileChange"
        accept=".pdf"
      />
    </div>

    <p class="mt-2 text-sm text-red-600" id="file_type">
      {{ describe }}
    </p>
  </div>
</template>

<style></style>
