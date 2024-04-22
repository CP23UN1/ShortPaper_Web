<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import AlertModal from './Alert/AlertModal.vue'

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
      showAlertModal('กรุณาเลือกไฟล์ PDF', 'error')
      return
    }

    emits('fileSelected', file)
  } else {
    showAlertModal('กรุณาเลือกไฟล์ใหม่', 'error')
  }
}

// Alert Modal
const isAlertModalOpen = ref(false)
const alertMessage = ref('')
const alertStatus = ref('')

const toggleAlertModal = () => {
  isAlertModalOpen.value = !isAlertModalOpen.value
}

const showAlertModal = (message, status) => {
  alertMessage.value = message
  alertStatus.value = status
  isAlertModalOpen.value = true
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

  <AlertModal
    :alertMessage="alertMessage"
    :is-alert-modal-open="isAlertModalOpen"
    :status="alertStatus"
    @toggle="toggleAlertModal"
  />
</template>

<style></style>
