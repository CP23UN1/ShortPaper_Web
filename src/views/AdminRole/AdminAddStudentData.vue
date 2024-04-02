<script setup>
import { ref } from 'vue'
import ApiService from '../../composables/apiService'
import Header from '../../components/Header.vue'
import ButtonMain from '../../components/ButtonMain.vue'
import { useRouter } from 'vue-router'

const file = ref(null)
const router = useRouter()

const handleFileUpload = (event) => {
  file.value = event.target.files[0]
}

const addStudentData = async () => {
  if (file.value) {
    const formData = new FormData()
    formData.append('csvFile', file.value)
    const res = await ApiService.addStudent(formData)

    if (res.status === 200) {
      alert(`บันทึกสำเร็จ`)
      router.push('/admin/students')
    } else {
      alert(`Failed to upload file. Please try again later.`)
    }
  }
}
</script>

<template>
  <div>
    <Header class="text-sm rounded-md" header="เพิ่มข้อมูลนักศึกษา" />
    <div class="p-5 shadow-md text-sm">
      <input
        type="file"
        @change="handleFileUpload"
        class="ml-2 border w-1/2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        accept=".csv"
      />
      <ButtonMain
        text="เพิ่มนักศึกษา"
        @click="addStudentData"
        class="ml-3 bg-bluemain border hover:bg-white border-bluemain hover:text-bluemain"
      />
    </div>
  </div>
</template>

<style></style>
