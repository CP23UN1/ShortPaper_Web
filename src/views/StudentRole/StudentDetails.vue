<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount, onMounted, ref } from 'vue'
import { useAuthStore } from '../../stores/auth'

import ApiService from '../../composables/apiService'

import Header from '../../components/Header.vue'
import ButtonMain from '../../components/ButtonMain.vue'

const route = useRoute()
const router = useRouter()
const store = useAuthStore()

const studentId = ref(store.userId)
const student = ref({})
const subjects = ref()

const getRegisteredSubjects = () => {
  if (student.value.subjects && student.value.subjects.length) {
    const registeredSubjects = student.value.subjects
      .filter(subject => subject.isRegisteredSubject)
      .map(subject => `${subject.subjectId} ${subject.subjectName}`)
      .join(', ');
    return registeredSubjects || 'ยังไม่มีข้อมูล';
  } else {
    return 'ยังไม่มีข้อมูล';
  }
}

const getPaperSubjects = () => {
  if (student.value.subjects && student.value.subjects.length) {
    const paperSubjects = student.value.subjects
      .filter(subject => subject.isPaperSubject)
      .map(subject => `${subject.subjectId} ${subject.subjectName}`)
      .join(', ');
    return paperSubjects || 'ยังไม่มีข้อมูล';
  } else {
    return 'ยังไม่มีข้อมูล';
  }
}

const getStudentAndSubjects = async () => {
  const studentRes = await ApiService.getStudentById(studentId.value)
  if (studentRes.status === 200) {
    const studentData = await studentRes.data
    console.log("studentData.data:", studentData.data);
    student.value = studentData.data
  }

  const subjectsRes = await ApiService.getSubjects()
  if (subjectsRes.status === 200) {
    const subjectsData = await subjectsRes.data
    subjects.value = subjectsData.data
  }
}

const wrongIconSvg = `<svg
                    class="w-[15px] h-[15px] text-red-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>`

const correctIconSvg = `<svg
                    class="w-[17px] h-[17px] text-teal-700"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>`

const isFileStatusValid = (fileStatus) => {
  return fileStatus !== undefined && fileStatus !== null
}

const hasFileWithId = (filesArray, fileId) => {
  return filesArray.some((file) => file.shortpaperFileTypeId === fileId)
}

onBeforeMount(async () => {
  await getStudentAndSubjects()
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
              <!-- <select
                id="isSubject"
                class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                disabled
              >
                <option>ยังไม่ได้เลือกวิชา</option>
                <option
                  v-for="subject in subjects"
                  :key="subject.subjectId"
                  :value="subject.subjectId"
                  :selected="subject.subjectId === student.subjects.subjectId"
                >
                  {{ subject.subjectId }} {{ subject.subjectName }}
                </option>
              </select> -->
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
              <!-- <select
                id="isSubject"
                class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                disabled
              >
                <option>ยังไม่ได้เลือกวิชา</option>
                <option
                  v-for="subject in subjects"
                  :key="subject.subjectId"
                  :value="subject.subjectId"
                  :selected="subject.subjectId === student.subjects.subjectId"
                >
                  {{ subject.subjectId }} {{ subject.subjectName }}
                </option>
              </select> -->
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

    <div class="text-sm font-medium mt-[24px] flex gap-5 justify-end">
      <RouterLink :to="`/edit`">
        <ButtonMain
          text="แก้ไขรายละเอียด"
          class="bg-bluemain border hover:bg-white hover:border-bluemain hover:text-bluemain"
        />
      </RouterLink>
    </div>
  </div>
</template>

<style></style>
