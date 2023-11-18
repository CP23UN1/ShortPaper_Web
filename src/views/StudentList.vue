<script setup>
import ApiService from '../composables/apiService'
import { onMounted, ref } from 'vue'

const users = ref([])

onMounted(async() => {
    const response = await ApiService.getUsers()
    users.value = response.data

    console.log(response);
    
})
</script>

<template>
  <div>
    <h2>Student List</h2>
    <table>
      <thead>
        <tr>
          <th>Student ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Year</th>
          <th>Registered Subject ID</th>
          <th>Short Paper Subject ID</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.studentId">
          <td>{{ user.studentId }}</td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.year }}</td>
          <td>{{ user.registeredSubjectId }}</td>
          <td>{{ user.shortPaperSubjectId }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style></style>
