<script setup>
import { ref } from 'vue'
import ApiService from '../../composables/apiService'
import Header from '../../components/Header.vue'
import ButtonMain from '../../components/ButtonMain.vue'

const file = ref(null)

const handleFileUpload = (event) => {
  file.value = event.target.files[0]
}

const assignAdvisors = async () => {
  if (file.value) {
    try {
      await ApiService.assignCommittee(file.value)
    } catch (error) {
      console.error('Error assigning committee:', error)
    }
  }
}
</script>

<template>
  <div>
    <Header class="text-sm rounded-md" header="Assign Advisor to Students" />
    <div class="p-5 shadow-md text-sm">
      <input
        type="file"
        @change="handleFileUpload"
        class="ml-2 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        accept=".csv"
      />
      <ButtonMain
        text="แต่งตั้งกรรมการ"
        @click="assignAdvisors"
        class="ml-3 bg-bluemain border hover:bg-white border-bluemain hover:text-bluemain"
      />
    </div>
  </div>
</template>

<style></style>
