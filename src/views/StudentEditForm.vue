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
  <form class="w-[1000px] mt-[24px] text-black text-sm font-medium font-['Sarabun'] grid" @submit.prevent="updateStudent">
    <div class="grid grid-cols-3 bg-white p-[24px] rounded-[4px]">
      <!--  -->
      <div>
        <div>
          <label for="studentId" class="mr-[16px]">รหัสนักศึกษา</label>
        </div>
        <div>
          <input type="text" id="studentId" v-model="student.studentId" disabled
            class=" border border-gray-400 rounded-[4px] w-[250px]" />
        </div>
      </div>
      <!--  -->
      <div>
        <div>
          <label for="firstName" class="mr-[16px]">ชื่อ</label>
        </div>
        <div>
          <input type="text" id="firstName" v-model="student.firstName"
            class=" border border-gray-400 rounded-[4px] w-[250px]" />
        </div>
      </div>
      <!--  -->
      <div>
        <div>
          <label for="lastName" class="mr-[16px]">นามสกุล</label>
        </div>
        <div>
          <input type="text" id="lastName" v-model="student.lastName"
            class=" border border-gray-400 rounded-[4px] w-[250px]" />
        </div>
      </div>
      <!--  -->
      <div>
        <div>
          <label for="email">Email</label>
        </div>
        <div>
          <input type="email" id="email" v-model="student.email"
            class=" border border-gray-400 rounded-[4px] w-[250px]" />
        </div>
      </div>
      <!--  -->
      <div>
        <div>
          <label for="phone" class="mr-[16px]">เบอร์โทรศัพท์</label>
        </div>
        <div>
          <input type="text" id="phone" v-model="student.phone" class=" border border-gray-400 rounded-[4px] w-[250px]" />
        </div>
      </div>
    </div>
    <!--  -->
    <div class="grid grid-cols-3 bg-white p-[24px] rounded-[4px] mt-[24px]">
      <div>
        <div>
          <label for="projectName">ชื่อหัวข้อโครงงาน</label>
        </div>
        <div>
          <input type="text" id="projectName" v-model="student.projectName"
            class=" border border-gray-400 rounded-[4px] w-[250px]" />
        </div>
      </div>
      <!--  -->
      <div>
        <div>
          <label for="workshopSubject">วิชาจัดทำ IS Report / Thesis / Project</label>
        </div>
        <div>
          <select id="workshopSubject" v-model="student.workshopSubject"
            class=" border border-gray-400 rounded-[4px] w-[250px]">
            <option v-for="subject in subjects" :key="subject.subjectId" :value="subject.subjectId">
              {{ subject.subjectName }}
            </option>
          </select>
        </div>
      </div>

      <!--  -->
      <div>
        <div>
          <label for="reportSubject">วิชาเลือก IS Report / Thesis / Project</label>
        </div>
        <div>
          <select id="reportSubject" v-model="student.reportSubjectId"
            class=" border border-gray-400 rounded-[4px] w-[250px]">
            <option v-for="subject in subjects" :key="subject.subjectId" :value="subject.subjectId">
              {{ subject.subjectName }}
            </option>
          </select>
        </div>
      </div>
      <!--  -->
    </div>
    <div class="text-sm font-medium space-x-4 mt-[24px]">
      <button type="submit"
        class="text-teal-700 border border-teal-700 rounded-[4px] px-[40px] py-[5px] hover:bg-teal-700 hover:text-white">บันทึก</button>
      <button type="submit"
        class="text-amber-600 border border-amber-600 rounded-[4px] px-[40px] py-[5px] hover:bg-amber-600 hover:text-white">แก้ไข</button>
    </div>
  </form>
</template>

  
