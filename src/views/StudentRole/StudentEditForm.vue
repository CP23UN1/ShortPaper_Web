<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { Modal } from 'flowbite'
import { useValidateStore } from '../../stores/validate'
import { useAuthStore } from '../../stores/auth'

import ApiService from '../../composables/apiService'

import ConfirmModal from '../../components/ConfirmModal.vue'
import ButtonMain from '../../components/ButtonMain.vue'

const router = useRouter()
const store = useValidateStore()
const authStore = useAuthStore()

const studentId = ref(authStore.userId)
const student = ref({})
const subjects = ref()
const studentSubjectId = ref()

const selectedSubjectId = ref()
const shortpaperTopicValue = computed({
  get: () =>
    student.value.shortpaper ? student.value.shortpaper.shortpaperTopic : '',
  set: (value) => (student.value.shortpaper.shortpaperTopic = value),
})

const modal = ref()
const toggleModal = () => {
  modal.value.toggle()
}

const getStudentAndSubjects = async () => {
  const studentRes = await ApiService.getStudentById(studentId.value)
  if (studentRes.status === 200) {
    const studentData = await studentRes.data
    student.value = studentData.data
    if (student.value.subjects !== null) {
      studentSubjectId.value = studentData.data.subjects.subjectId
    }
  }

  const subjectsRes = await ApiService.getSubjects()
  if (subjectsRes.status === 200) {
    const subjectsData = await subjectsRes.data
    subjects.value = subjectsData.data
  }
}

const validateData = () => {
  let isValid = true

  if (!student.value.firstname) {
    alert('กรุณาใส่ชื่อ')
    isValid = false
  }

  if (!student.value.lastname) {
    alert('กรุณาใส่นามสกุล')
    isValid = false
  }

  if (!student.value.phonenumber) {
    alert('กรุณาใส่เบอร์โทรศัพท์')
    isValid = false
  } else if (student.value.phonenumber.length !== 10) {
    alert('กรุณาใส่เบอร์โทรศัพท์ที่ถูกต้อง')
    isValid = false
  }

  if (!student.value.shortpaper.shortpaperTopic) {
    alert('กรุณาใส่หัวข้อโครงงาน')
    isValid = false
  }

  if (
    student.value.alternativeEmail &&
    !store.validateEmail(student.value.alternativeEmail)
  ) {
    alert('กรุณาใส่อีเมลที่ถูกต้อง')
    isValid = false
  }

  return isValid
}

const updateStudent = async () => {
  if (validateData()) {

    if (!student.value.shortpaper) {
      student.value.shortpaper = {};
    }

    const updatedStudent = {
      firstname: student.value.firstname,
      lastname: student.value.lastname,
      email: student.value.email,
      alternativeEmail: student.value.alternativeEmail,
      phonenumber: student.value.phonenumber,
      shortpaper: {
        shortpaperTopic: shortpaperTopicValue.value,
      },
      subjects: {
        subjectId: selectedSubjectId.value,
      },
    }
    await ApiService.updateStudent(studentId.value, updatedStudent)
    modal.value.toggle()
    alert('บันทึกสำเร็จ')
    router.push('/student/' + studentId.value)
  }
}

onBeforeMount(async () => {
  await getStudentAndSubjects()

  const targetEl = document.getElementById('save-modal')
  modal.value = new Modal(targetEl)
})
</script>

<template>
  <div>
    <div
      class="justify-center item-center bg-bluemain p-10 rounded-lg shadow-lg mt-10"
    >
      <h1 class="text-white font-black text-xl">แก้ไขข้อมูลส่วนตัว</h1>

      <div class="grid grid-cols-2 gap-16 mt-4">
        <div class="bg-white p-5 rounded-lg">
          <h1 class="text-lg font-black">ข้อมูลทั่วไป</h1>
          <div class="mt-3">
            <div class="mb-1">
              <label for="studentId" class="block font-extrabold"
                >รหัสนักศึกษา:
              </label>
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
              />
            </div>
          </div>
        </div>
        <div class="bg-white p-5 rounded-lg">
          <h1 class="text-lg font-black">ข้อมูลโครงงาน</h1>
          <div class="mt-3">
            <div>
              <div class="mb-1">
                <label for="isTopic" class="block font-extrabold"
                  >ชื่อหัวข้อโครงงาน</label
                >
                <input
                  type="text"
                  id="isTopic"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  v-model="shortpaperTopicValue"
                />
              </div>
            </div>
            <div class="mb-1">
              <label class="font-extrabold block" for="isSubject"
                >วิชาจัดทำ IS Report / Thesis / Project</label
              >
              <select
                id="isSubject"
                class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                v-model="selectedSubjectId"
              >
                <option v-if="!subjects">กำลังโหลด</option>
                <option v-else>ยังไม่ได้เลือกวิชา</option>
                <option
                  v-for="subject in subjects"
                  :key="subject.subjectId"
                  :value="subject.subjectId"
                  :selected="subject.subjectId == studentSubjectId"
                >
                  {{ subject.subjectId }} {{ subject.subjectName }}
                </option>
              </select>
            </div>
            <!-- <div class="mb-1">
              <label class="font-extrabold block mb-2" for="workshopSubject"
                >วิชาเลือก Workshop / Thesis / Project</label
              >
              <select
                id="isSubject"
                class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              >
              <option v-if="!subjects">กำลังโหลด</option>
                <option v-else>ยังไม่ได้เลือกวิชา</option>
                <option
                  v-for="subject in subjects"
                  :key="subject.subjectId"
                  :value="subject.subjectId"
                  :selected="subject.subjectId == studentSubjectId"
                >
                  {{ subject.subjectId }} {{ subject.subjectName }}
                </option>
              </select>
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <div class="text-sm font-medium mt-[24px] flex gap-5 justify-end">
      <RouterLink :to="`/student/${studentId}`">
        <ButtonMain
          class="bg-error border hover:bg-white hover:border-error hover:text-error"
          text="ยกเลิกการบันทึก"
        />
      </RouterLink>
      <ButtonMain
        class="bg-correct border hover:bg-white hover:border-correct hover:text-correct"
        text="บันทึกการแก้ไข"
        @click="toggleModal"
      />
    </div>

    <ConfirmModal
      id="save-modal"
      @save="updateStudent"
      @toggle="toggleModal"
      message="ต้องการแก้ไขหรือไม่"
      buttonColor="bg-amber-500 hover:bg-amber-600"
      iconColor="text-amber-500"
    />
  </div>
</template>

<style></style>
