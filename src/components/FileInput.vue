<script setup>
import { ref } from 'vue'

import ButtonMain from './ButtonMain.vue'

const emits = defineEmits(['upload'])
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
        @change="$emit('upload')"
      />
    </div>

    <p class="mt-2 text-sm text-red-600" id="file_type">
      {{ describe }}
    </p>
  </div>
</template>

<style></style>
