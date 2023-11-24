<script setup>
import ApiService from '../../composables/apiService'
import { onMounted, ref, computed, onBeforeMount, onUpdated } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const student = ref({})
const subjects = ref([])

const getStudent = async () => {
  const res = await ApiService.getStudentById(1)

  if (res.status === 200) {
    const data = await res.data
    student.value = data
  }
}

const getSubjects = async () => {
  const res = await ApiService.getSubjects()

  if (res.status === 200) {
    const data = await res.data
    subjects.value = data
  }
}

const updateStudent = async () => {
  try {
    await ApiService.updateStudent(student.value.userId, student.value)
    alert('successfully updated')
  } catch (error) {
    console.error('Error updating student:', error)
  }
}

onBeforeMount(async () => {
  await getStudent()
  await getSubjects()
})

onUpdated(() => {
  console.log(student.value)
})
</script>

<template>
  <div>
    <h2>Edit Student</h2>
    <form @submit.prevent="updateStudent">
      <div>
        <label for="studentId">Student ID:</label>
        <input
          type="text"
          id="studentId"
          v-model="student.studentId"
          disabled
          class="bg-slate-200"
        />
      </div>
      <div>
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="student.firstname" />
      </div>
      <div>
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="student.lastname" />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="student.email" />
      </div>
      <div>
        <label for="phone">Phone:</label>
        <input type="text" id="phone" v-model="student.phoneNumber" />
      </div>
      <div>
        <label for="year">Year:</label>
        <input type="text" id="year" v-model="student.year" />
      </div>
      <div>
        <label for="projectName">Project Name:</label>
        <input type="text" id="projectName" v-model="student.projectName" />
      </div>
      <div>
        <label for="registeredSubject">Registered Subject:</label>
        <select id="registeredSubject" v-model="student.registeredSubjectid">
          <option
            v-for="subject in subjects"
            :key="subject.id"
            :value="subject.id"
          >
            {{ subject.subjectId }} {{ subject.subjectName }}
          </option>
        </select>
      </div>
      <div>
        <label for="shortpaperSubject">Short Paper Subject:</label>
        <select id="shortpaperSubject" v-model="student.shortpaperSubjectid">
          <option
            v-for="subject in subjects"
            :key="subject.id"
            :value="subject.id"
          >
            {{ subject.subjectId }} {{ subject.subjectName }}
          </option>
        </select>
      </div>
      <div>
        <button type="submit" class="btn bg-red-600">Update Student</button>
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
