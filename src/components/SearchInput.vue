<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import ButtonMain from './ButtonMain.vue'

const emits = defineEmits(['searchKeyword'])
const props = defineProps({
  label: {
    type: String,
    default: 'ค้นหา',
  },
  placeholder: {
    type: String,
    default: 'ค้นหา',
  },
})

const keyword = ref('')
const inputId = 'searchInput-' + Math.random().toString(36).substr(2, 9)
</script>

<template>
  <label :for="inputId" class="text-base">{{ label }}</label>
  <div class="flex items-center space-x-2 mt-2">
    <div class="relative flex-1">
      <input
        :id="inputId"
        type="search"
        class="block w-full p-2 ps-10 border border-gray-300 rounded-lg bg-gray-50 focus:ring-bluemain focus:border-bluemain"
        :placeholder="placeholder"
        v-model="keyword"
        @keydown.enter.prevent
      />
      <div
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <svg
          class="w-4 h-4 text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
    </div>
    <ButtonMain
      type="submit"
      class="bg-bluemain border hover:bg-white border-bluemain hover:text-bluemain"
      @click="$emit('searchKeyword', keyword)"
      text="ค้นหา"
    />
  </div>
</template>

<style></style>
