<script setup>
const emits = defineEmits(['save', 'toggle'])
const props = defineProps({
  message: {
    type: String,
    default: 'ต้องการบันทึกหรือไม่',
  },
  buttonColor: {
    type: String,
    default: '',
  },
  iconColor: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div
    tabindex="-1"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    aria-hidden="true"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow">
        <button
          type="button"
          class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
          @click="$emit('toggle')"
        >
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span class="sr-only">ปิดหน้าต่าง</span>
        </button>
        <div class="p-4 md:p-5 text-center">
          <svg
            class="mx-auto mb-4 w-12 h-12"
            :class="iconColor"
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
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 class="mb-5 text-lg font-normal text-gray-500">
            {{ message }}
          </h3>
          <button
            type="button"
            class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
            @click="$emit('save', id, obj)"
            :class="[buttonColor]"
          >
            บันทึก
          </button>
          <button
            type="button"
            class="text-red-700 bg-white hover:bg-red-700 hover:text-white rounded-lg border border-red-700 text-sm font-medium px-5 py-2.5 focus:z-10"
            @click="$emit('toggle')"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
