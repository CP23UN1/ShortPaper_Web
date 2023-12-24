<script setup>
import { ref } from 'vue'

const emits = defineEmits(['searchKeyword'])
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: [],
  },
})

const keyword = ref()
</script>

<template>
  <div>
    <label
      for="selectKeyword"
      class="block mb-2 font-medium text-gray-900 dark:text-white"
      >{{ label }}</label
    >
    <select
      id="selectKeyword"
      class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    >
      <option selected v-for="option in options">{{ option }}</option>
    </select>
  </div>
</template>

<style></style>
