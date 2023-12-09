<script setup>
import ApiService from '../../composables/apiService'
import { onMounted, ref } from 'vue'

const students = ref([])


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
    const studentsResponse = await ApiService.getStudents()
    students.value = studentsResponse.data
})
</script>

<template>
  <div class="m-5">
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
        <tr v-for="student in students" :key="student.userId" class="text-center">
          <td>{{ student.studentId }}</td>
          <td>{{ student.firstname }}</td>
          <td>{{ student.lastname }}</td>
          <td>{{ student.email }}</td>
          <td>{{ student.year }}</td>
          <td>{{ student.registeredSubject ? student.registeredSubject.subjectId : ""  }}</td>
          <td>{{ student.shortpaperSubject ? student.shortpaperSubject.subjectId : "" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style></style>
