<script setup>
import { ref } from 'vue'
const emits = defineEmits(['toggle'])
const props = defineProps({
  alertMessage: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    default: 'error',
  },
  icon: {
    type: String,
    default: '',
  },
})

const isAlertModalOpen = ref(false)
const alertIcon = ref()

const successIcon = `<svg class="w-[40px] h-[40px] text-correct" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/>
</svg>
`

const errorIcon = `<svg class="w-[40px] h-[40px] text-error" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clip-rule="evenodd"/>
</svg>
`

const showAlertModal = (message) => {
  if (props.status == 'error') {
    alertIcon.value = errorIcon
  } else if (props.status == 'success') {
    alertIcon.value = successIcon
  }

  props.alertMessage = message
  isAlertModalOpen.value = true
}

const toggleAlertModal = () => {
  isAlertModalOpen.value = !isAlertModalOpen.value
}
</script>

<template>
  <div
    class="fixed top-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50"
    :class="{ hidden: !isAlertModalOpen }"
    id="alert-modal"
    tabindex="-1"
  >
    <div class="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-md">
      <div class="mb-4 flex justify-end">
        <button type="button" @click="$emit('toggle')">
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
      </div>
      <div class="text-center mt-[-10px]">
        <div v-html="alertIcon"></div>

        <h2 class="text-red-600 text-lg font-semibold mb-2">เกิดข้อผิดพลาด</h2>
        <p class="text-gray-800">{{ props.alertMessage }}</p>
      </div>
    </div>
  </div>
</template>

<style></style>
