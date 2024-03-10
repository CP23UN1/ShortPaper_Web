<script setup>
import { ref } from 'vue'
import ApiService from '../../composables/apiService'
import Header from '../../components/Header.vue'
import ButtonMain from '../../components/ButtonMain.vue'

const file = ref(null)

const handleFileUpload = (event) => {
  file.value = event.target.files[0]
}

// Vue component
const addStudentData = async () => {
  if (file.value) {
    try {
      await ApiService.addStudent(file.value); // Pass the file directly to the assignCommittee function
      console.log('File successfully sent.'); // Log success message
    } catch (error) {
      console.error('Error assigning committee:', error); // Log error message
    }
  } else {
    console.error('No file selected.'); // Log error message if no file is selected
  }
}

</script>

<template>
    <div>
      <Header class="text-sm rounded-md" header="Add Student Data" />
      <div class="p-5 shadow-md text-sm">
        <input type="file" @change="handleFileUpload" accept=".csv" />
        <ButtonMain text="Assign Advisors" @click="addStudentData" />
      </div>
    </div>
</template>

  
<style></style>
  