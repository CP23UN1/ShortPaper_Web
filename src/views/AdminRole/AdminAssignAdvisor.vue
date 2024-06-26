<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import ApiService from '../../composables/apiService'
import Header from '../../components/Header.vue'
import ButtonMain from '../../components/ButtonMain.vue'
import AlertModal from '../../components/Alert/AlertModal.vue'

const file = ref(null)
const csvData = ref(null)
const router = useRouter()

const handleFileUpload = (event) => {
  file.value = event.target.files[0]
  readCSV()
}

const readCSV = () => {
  const reader = new FileReader()
  reader.onload = (event) => {
    const text = event.target.result
    const rows = text.split('\n')
    const data = rows.map((row) => row.split(','))
    csvData.value = data
  }
  reader.readAsText(file.value)
}

const assignAdvisors = async () => {
  if (file.value) {
    const formData = new FormData()
    formData.append('csvFile', file.value)
    const res = await ApiService.assignCommittee(formData)

    if (res.status === 200) {
      showAlertModal(`บันทึกสำเร็จ`, 'success')
      await new Promise(resolve => setTimeout(resolve, 1000))
      await router.push('/admin/students')
    } else {
      showAlertModal('การอัปโหลดไฟล์ผิดพลาด', 'error')
    }
  }
}

const downloadIcon = `<svg class="w-[20px] h-[20px] text-bluemain" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 19">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15h.01M4 12H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-3M9.5 1v10.93m4-3.93-4 4-4-4"/>
  </svg>`

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
  <div>
    <Header class="text-sm rounded-md" header="แต่งตั้งกรรมการ" />
    <div class="p-5 shadow-md text-sm">
      <div class="mb-5 justify-end flex">
        <a
          href="/template/Template_AssignCommittee.csv"
          download="Template_AssignCommittee.csv"
        >
          <button
            class="flex shadow-md py-2 px-4 rounded-md bg-blue-100 hover:bg-blue-200"
          >
            <p class="mr-2">ดาวน์โหลดเทมเพลต</p>
            <div v-html="downloadIcon"></div>
          </button>
        </a>
      </div>

      <div class="mb-2">
        <label for="studentCsv">อัปโหลดไฟล์ Excel</label>
      </div>
      <input
        id="studentCsv"
        type="file"
        @change="handleFileUpload"
        class="border w-1/2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        accept=".csv"
      />
    </div>

    <div v-if="csvData">
      <h2 class="mt-4 mb-2 text-lg font-semibold">Preview:</h2>
      <div class="overflow-x-auto">
        <table class="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-100">
              <th
                v-for="(cell, index) in csvData[0]"
                :key="index"
                class="py-2 px-4 border border-gray-300"
              >
                {{ cell }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, rowIndex) in csvData.slice(1)"
              :key="rowIndex"
              class="bg-white"
            >
              <td
                v-for="(cell, cellIndex) in row"
                :key="cellIndex"
                class="py-2 px-4 border border-gray-300"
              >
                {{ cell }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="justify-end items-end flex">
      <ButtonMain
        v-if="file"
        text="แต่งตั้งกรรมการ"
        @click="assignAdvisors"
        class="my-5 bg-bluemain border hover:bg-white border-bluemain hover:text-bluemain"
      />
    </div>
  </div>

  <AlertModal
    :alertMessage="alertMessage"
    :is-alert-modal-open="isAlertModalOpen"
    :status="alertStatus"
    @toggle="toggleAlertModal"
  />
</template>

<style></style>
