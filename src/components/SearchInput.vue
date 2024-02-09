<script setup>
import { ref } from 'vue'

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

const keyword = ref()
</script>

<template>
  <form  @submit.prevent="$emit('searchKeyword', keyword)">
    <label for="search">{{ label }}</label>
    <div class="relative">
      <div
        class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
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
      <input
        type="search"
        id="search"
        class="block w-full mt-2 p-2 ps-10 border border-gray-300 rounded-lg bg-gray-50 focus:ring-bluemain focus:border-bluemain"
        :placeholder="placeholder"
        v-model="keyword"
      />
      <!-- <button
          type="submit"
          class="text-white absolute end-2.5 bottom-2.5 bg-bluebtn hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          @click="$emit('searchKeyword', keyword)"
        >
          ค้นหา
        </button> -->
    </div>
  </form>
</template>

<style></style>
