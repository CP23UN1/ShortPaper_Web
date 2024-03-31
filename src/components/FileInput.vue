<script setup>
import { defineProps, defineEmits } from 'vue'
import ButtonMain from './ButtonMain.vue'

const emits = defineEmits(['fileSelected', 'sendFile'])
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

    <!-- <ButtonMain
      text="บันทึก"
      class="bg-bluemain border hover:bg-white hover:border-bluemain hover:text-bluemain ml-3"
      @click="$emit('sendFile')"
    /> -->

    <p class="mt-2 text-sm text-red-600" id="file_type">
      {{ describe }}
    </p>
  </div>
</template>

<style></style>
