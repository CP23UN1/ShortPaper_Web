<script setup>
  import ApiService from '../composables/apiService'
  import { onMounted, ref } from 'vue'
  
  const student = ref({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    projectName: '',
    workshopSubject: '',
    reportSubjectId: ''
  })
  
  const subjects = ref([])
  
  onMounted(async () => {
    try {
      // Fetch student details
      const response = await ApiService.getStudentById(/* pass student id here */)
      student.value = response.data // Assuming the actual data is in the `data` property of the response
  
      // Fetch subjects for drop-downs
      const subjectsResponse = await ApiService.getSubjects()
      subjects.value = subjectsResponse.data
    } catch (error) {
      console.error('Error fetching student details: ', error)
    }
  })
  
  const updateStudent = async () => {
    try {
      // Perform API call to update student details
      await ApiService.updateStudent(/* pass updated student data here */)
      // You may want to handle success or navigate back to the student list page
    } catch (error) {
      console.error('Error updating student:', error)
    }
  }
  </script>

<template>
    <div class="m-5">
      <form @submit.prevent="updateStudent">
        <div>
          <label for="studentId">Student ID:</label>
          <input type="text" id="studentId" v-model="student.studentId" disabled />
        </div>
        <div>
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="student.firstName" />
        </div>
        <div>
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="student.lastName" />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="student.email" />
        </div>
        <div>
          <label for="phone">Phone:</label>
          <input type="text" id="phone" v-model="student.phone" />
        </div>
        <div>
          <label for="projectName">Project Name:</label>
          <input type="text" id="projectName" v-model="student.projectName" />
        </div>
        <div>
          <label for="workshopSubject">Workshop Subject:</label>
          <select id="workshopSubject" v-model="student.workshopSubject">
            <option v-for="subject in subjects" :key="subject.subjectId" :value="subject.subjectId">
              {{ subject.subjectName }}
            </option>
          </select>
        </div>
        <div>
          <label for="reportSubject">Report Subject:</label>
          <select id="reportSubject" v-model="student.reportSubjectId">
            <option v-for="subject in subjects" :key="subject.subjectId" :value="subject.subjectId">
              {{ subject.subjectName }}
            </option>
          </select>
        </div>
        <div>
          <button type="submit">Update Student</button>
        </div>
      </form>
    </div>
  </template>

  
  <style>
    /* Add some basic styling for the form */
    form {
      max-width: 400px;
      margin: 20px auto;
    }
  
    label {
      display: block;
      margin-bottom: 5px;
    }
  
    input,
    select {
      width: 100%;
      padding: 8px;
      margin-bottom: 10px;
    }
  
    button {
      background-color: #4caf50;
      color: white;
      padding: 10px 15px;
      border: none;
      cursor: pointer;
    }
  </style>
  