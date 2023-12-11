<script setup>
import ApiService from '../../composables/apiService'
import { onMounted, ref } from 'vue'
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

onMounted(async () => {
  await getStudent()
  await getSubjects()
})
</script>

<template>
  <form
    class="mt-[24px] text-black text-sm font-medium font-['Sarabun'] grid"
  >
  <div class="bg-bluemain text-white p-4 mb-3">ข้อมูลนักศึกษา</div>
    <div class="grid grid-cols-3 bg-white p-[24px] rounded-[4px] shadow-md">
      <!--  -->
      <div>
        <div>
          <label for="studentId" class="mr-[16px]">รหัสนักศึกษา</label>
        </div>
        <div>
          <input
            type="text"
            id="studentId"
            v-model="student.studentId"
            disabled
            class="border border-gray-400 rounded-[4px] w-[250px]"
          />
        </div>
      </div>
      <!--  -->
      <div>
        <div>
          <label for="firstName" class="mr-[16px]">ชื่อ</label>
        </div>
        <div>
          <input
            type="text"
            id="firstName"
            v-model="student.firstname"
            class="border border-gray-400 rounded-[4px] w-[250px]"
          />
        </div>
      </div>
      <!--  -->
      <div>
        <div>
          <label for="lastName" class="mr-[16px]">นามสกุล</label>
        </div>
        <div>
          <input
            type="text"
            id="lastName"
            v-model="student.lastname"
            class="border border-gray-400 rounded-[4px] w-[250px]"
          />
        </div>
      </div>
      <!--  -->
      <div class="mt-3">
        <div>
          <label for="email">Email</label>
        </div>
        <div>
          <input
            type="email"
            id="email"
            v-model="student.email"
            class="border border-gray-400 rounded-[4px] w-[250px]"
          />
        </div>
      </div>
      <!--  -->
      <div class="mt-3">
        <div>
          <label for="phone" class="mr-[16px]">เบอร์โทรศัพท์</label>
        </div>
        <div>
          <input
            type="text"
            id="phone"
            v-model="student.phoneNumber"
            class="border border-gray-400 rounded-[4px] w-[250px]"
          />
        </div>
      </div>
    </div>
    <!--  -->
    <div class="bg-bluemain text-white p-4 my-3">โครงงานที่จัดทำ</div>
    <div class="grid grid-cols-3 bg-white p-[24px] rounded-[4px] shadow-md">
      <div>
        <div>
          <label for="projectName">ชื่อหัวข้อโครงงาน</label>
        </div>
        <div>
          <input
            type="text"
            id="projectName"
            v-model="student.projectName"
            class="border border-gray-400 rounded-[4px] w-[250px]"
          />
        </div>
      </div>
      <!--  -->
      <div>
        <div>
          <label for="workshopSubject"
            >วิชาจัดทำ IS Report / Thesis / Project</label
          >
        </div>
        <div>
          <select
            id="workshopSubject"
            v-model="student.registeredSubjectid"
            class="border border-gray-400 rounded-[4px] w-[250px]"
          >
            <option
              v-for="subject in subjects"
              :key="subject.id"
              :value="subject.id"
            >
              {{ subject.subjectId }} {{ subject.subjectName }}
            </option>
          </select>
        </div>
      </div>

      <div>
        <div>
          <label for="reportSubject"
            >วิชาเลือก IS Report / Thesis / Project</label
          >
        </div>
        <div>
          <select
            id="reportSubject"
            v-model="student.shortpaperSubjectid"
            class="border border-gray-400 rounded-[4px] w-[250px]"
          >
            <option
              v-for="subject in subjects"
              :key="subject.id"
              :value="subject.id"
            >
              {{ subject.subjectId }} {{ subject.subjectName }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="text-sm font-medium space-x-4 mt-[24px] text-end">
      <!-- <button
        type="submit"
        class="text-red-600 border border-red-600 rounded-[4px] px-[40px] py-[5px] hover:bg-red-600 hover:text-white"
        >
        ยกเลิก
      </button> -->
      <button
        type="submit"
        class="text-teal-700 border border-teal-700 rounded-[4px] px-[40px] py-[5px] hover:bg-teal-700 hover:text-white"
        @click="updateStudent"
      >
        บันทึก
      </button>
      <!-- <button
        type="submit"
        class="text-amber-600 border border-amber-600 rounded-[4px] px-[40px] py-[5px] hover:bg-amber-600 hover:text-white"
      >
        แก้ไข
      </button> -->
    </div>
  </form>
</template>