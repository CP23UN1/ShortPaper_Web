<script setup>
import ApiService from '../composables/apiService'
import { onMounted, ref } from 'vue'

const users = ref([])


// const getSubjectName = (subjectId) => {
//   const subject = subjects.value.find(s => s.id === subjectId)
//   const subjectObj = {
//     subjectId: subject.subjectId,
//     subjectName: subject.subjectName
//   }
//   return subjectObj
// }

onMounted(async() => {
  // User API
    const usersResponse = await ApiService.getUsers()
    users.value = usersResponse.data
})
</script>

<template>
  <div>
    <h2>Student List</h2>
    <!-- {{ users[0] }} -->
    <table>
      <thead>
        <tr>
          <th>Student ID</th>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Email</th>
          <th>Year</th>
          <th>Registered Subject ID</th>
          <th>Short Paper Subject ID</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.userId" class="text-center">
          <td>{{ user.studentId }}</td>
          <td>{{ user.firstname }}</td>
          <td>{{ user.lastname }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.year }}</td>
          <td>{{ user.registeredSubject ? user.registeredSubject.subjectId : ""  }}</td>
          <td>{{ user.shortpaperSubject ? user.shortpaperSubject.subjectId : "" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style></style>
