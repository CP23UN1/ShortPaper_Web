<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount, onMounted, ref } from 'vue'
import { useAuthStore } from '../../stores/auth'

import ApiService from '../../composables/apiService'

const route = useRoute()

const student = ref({})

const getRegisteredSubjects = () => {
  if (student.value.subjects && student.value.subjects.length) {
    const registeredSubjects = student.value.subjects 
      .filter((subject) => subject.isPaperSubject)
      .map((subject) => `${subject.subjectId} ${subject.subjectName}`)
      .join(', ')
    return registeredSubjects || 'ยังไม่มีข้อมูล'
  } else {
    return 'ยังไม่มีข้อมูล'
  }
}

const getPaperSubjects = () => {
  if (student.value.subjects && student.value.subjects.length) {
    const paperSubjects = student.value.subjects
      .filter((subject) => subject.isRegisteredSubject)
      .map((subject) => `${subject.subjectId} ${subject.subjectName}`)
      .join(', ')
    return paperSubjects || 'ยังไม่มีข้อมูล'
  } else {
    return 'ยังไม่มีข้อมูล'
  }
}

const getStudent = async () => {
  const studentRes = await ApiService.getStudentById(route.params.id)
  if (studentRes.status === 200) {
    const studentData = await studentRes.data
    student.value = studentData.data
  }
}

onBeforeMount(async () => {
  await getStudent()
})
</script>

<template>
  <div>
    <div
      class="justify-center item-center bg-bluemain p-10 rounded-lg shadow-lg mt-10"
    >
      <h1 class="text-white font-black text-xl">ข้อมูลส่วนตัว</h1>

      <div class="grid grid-cols-2 gap-16 mt-4">
        <div class="bg-white p-5 rounded-lg">
          <h1 class="text-lg font-black">ข้อมูลทั่วไป</h1>
          <div class="mt-3">
            <div class="mb-1">
              <label for="studentId" class="block font-extrabold"
                >รหัสนักศึกษา:</label
              >
              <input
                type="text"
                id="studentId"
                class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                v-model="student.studentId"
                disabled
              />
            </div>
            <div class="mb-1">
              <label for="firstname" class="block font-extrabold"
                >ชื่อ: <span class="text-error">*</span></label
              >
              <input
                type="text"
                id="firstname"
                class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                v-model="student.firstname"
                disabled
              />
            </div>
            <div class="mb-1">
              <label for="lastname" class="block font-extrabold"
                >นามสกุล: <span class="text-error">*</span></label
              >
              <input
                type="text"
                id="lastname"
                class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                v-model="student.lastname"
                disabled
              />
            </div>
            <div class="mb-1">
              <label for="email" class="block font-extrabold">อีเมล:</label>
              <input
                type="text"
                id="email"
                class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                v-model="student.email"
                disabled
              />
            </div>
            <div class="mb-1">
              <label for="alternativeEmail" class="block font-extrabold"
                >อีเมลสำรอง:</label
              >
              <input
                type="text"
                id="alternativeEmail"
                class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                v-model="student.alternativeEmail"
                disabled
              />
            </div>
            <div class="mb-1">
              <label for="phonenumber" class="block font-extrabold"
                >เบอร์โทรศัพท์: <span class="text-error">*</span></label
              >
              <input
                type="text"
                id="phonenumber"
                class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                v-model="student.phonenumber"
                disabled
              />
            </div>
          </div>
        </div>
        <div class="bg-white p-5 rounded-lg">
          <h1 class="text-lg font-black">ข้อมูลโครงงาน</h1>
          <div class="mt-3">
            <div>
              <div>
                <div class="mb-1">
                  <label for="shortpaperTopic" class="block font-extrabold"
                    >ชื่อหัวข้อโครงงาน</label
                  >
                  <input
                    type="text"
                    id="shortpaperTopic"
                    class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    v-model="student.shortpaper.shortpaperTopic"
                    v-if="student.shortpaper"
                    disabled
                  />
                  <input
                    type="text"
                    id="shortpaperTopic"
                    class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="ยังไม่ได้ระบุ"
                    disabled
                    v-else
                  />
                </div>
              </div>
            </div>
            <div class="mb-1">
              <label class="font-extrabold block" for="isSubject"
                >วิชาจัดทำ IS Report / Thesis / Project</label
              >
              <input
                type="text"
                id="isSubject"
                class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                :value="getRegisteredSubjects()"
                disabled
                v-if="getRegisteredSubjects()"
              />
              <input
                type="text"
                id="isSubject"
                class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="ยังไม่ได้เลือกวิชา"
                disabled
                v-else
              />
            </div>
            <div class="mb-1">
              <label class="font-extrabold block mb-2" for="workshopSubject"
                >วิชาเลือก Workshop / Thesis / Project</label
              >
              <input
                type="text"
                id="workshopSubject"
                class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                :value="getPaperSubjects()"
                disabled
                v-if="getPaperSubjects()"
              />
              <input
                type="text"
                id="workshopSubject"
                class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="ยังไม่ได้เลือกวิชา"
                disabled
                v-else
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
