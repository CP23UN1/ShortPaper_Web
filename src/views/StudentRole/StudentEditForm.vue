<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Modal } from 'flowbite'
import { useValidateStore } from '../../stores/validate'
import { useAuthStore } from '../../stores/auth'

import ApiService from '../../composables/apiService'

import ConfirmModal from '../../components/ConfirmModal.vue'
import ButtonMain from '../../components/ButtonMain.vue'
import AlertModal from '../../components/Alert/AlertModal.vue'

const router = useRouter()
const store = useValidateStore()
const authStore = useAuthStore()

const studentId = ref(authStore.userId)
const student = ref({})
const subjects = ref()
const studentSubjectId = ref()
const shortpaperTopic = ref()
const shortpaper = ref({})
const shortpaperId = ref()
const registeredSubjects = ref()
const registeredSubjectsId = ref()
const paperSubjects = ref()
const paperSubjectsId = ref()

const modal = ref()
const toggleModal = () => {
  modal.value.toggle()
}

const getStudentAndSubjectsAndShortpapers = async () => {
  const studentRes = await ApiService.getStudentById(studentId.value)
  if (studentRes.status === 200) {
    const studentData = await studentRes.data
    student.value = studentData.data
    if (studentData.data.subjects) {
      studentSubjectId.value = studentData.data.subjects.subjectId
      registeredSubjects.value = studentData.data.subjects
        .filter((subject) => subject.isRegisteredSubject)
        .map((subject) => subject.subjectId)
      paperSubjects.value = studentData.data.subjects
        .filter((subject) => subject.isPaperSubject)
        .map((subject) => subject.subjectId)

      registeredSubjectsId.value = registeredSubjects.value[0]
      paperSubjectsId.value = paperSubjects.value[0]
    }
  }

  const subjectsRes = await ApiService.getSubjects()
  if (subjectsRes.status === 200) {
    const subjectsData = await subjectsRes.data
    subjects.value = subjectsData.data
  }

  const shortpaperRes = await ApiService.getShortPaper(studentId.value)
  if (shortpaperRes.status === 200) {
    const shortpaperData = await shortpaperRes.data
    shortpaper.value = shortpaperData.data
    if (shortpaper.value == null) {
      shortpaperId.value = ''
      shortpaperTopic.value = ''
    } else {
      shortpaperId.value = shortpaper.value.shortpaperId
      shortpaperTopic.value = shortpaper.value.shortpaperTopic
    }
  }
}

const validateData = () => {
  let isValid = true

  if (!student.value.firstname) {
    showAlertModal('กรุณาใส่ชื่อ', 'error')
    isValid = false
  }

  if (!student.value.lastname) {
    showAlertModal('กรุณาใส่นามสกุล', 'error')
    isValid = false
  }

  if (!student.value.phonenumber) {
    showAlertModal('กรุณาใส่เบอร์โทรศัพท์', 'error')
    isValid = false
  } else if (student.value.phonenumber.length !== 10) {
    showAlertModal('กรุณาใส่เบอร์โทรศัพท์ที่ถูกต้อง', 'error')
    isValid = false
  }

  if (
    student.value.alternativeEmail &&
    !store.validateEmail(student.value.alternativeEmail)
  ) {
    showAlertModal('กรุณาใส่อีเมลที่ถูกต้อง', 'error')
    isValid = false
  }

  return isValid
}

const updateStudentAndShortpaper = async () => {
  if (validateData()) {
    const updatedStudent = {
      studentId: studentId.value,
      firstname: student.value.firstname,
      lastname: student.value.lastname,
      email: student.value.email,
      alternativeEmail: student.value.alternativeEmail,
      phonenumber: student.value.phonenumber,
    }
    await ApiService.updateStudent(studentId.value, updatedStudent)

    if (shortpaperId.value !== '') {
      const updatedShortpaper = {
        shortpaperId: shortpaper.value.shortpaperId,
        shortpaperTopic: shortpaperTopic.value,
      }
      await ApiService.updateShortpaper(shortpaper.value.id, updatedShortpaper)
    } else {
      const newShortpaper = {
        shortpaperTopic: shortpaperTopic.value,
        studentId: studentId.value,
      }
      await ApiService.addShortpaper(newShortpaper)
    }

    if (
      registeredSubjectsId.value &&
      paperSubjectsId.value &&
      registeredSubjectsId.value == paperSubjectsId.value
    ) {
      const updatedRegisteredSubject = {
        SubjectId: paperSubjectsId.value,
        IsRegisteredSubject: true,
        IsPaperSubject: true,
      }
      await ApiService.updateSubject(studentId.value, updatedRegisteredSubject)
    }

    if (
      registeredSubjectsId.value &&
      registeredSubjectsId.value != paperSubjectsId.value
    ) {
      const updatedRegisteredSubject = {
        SubjectId: registeredSubjectsId.value,
        IsRegisteredSubject: true,
        IsPaperSubject: false,
      }
      await ApiService.updateSubject(studentId.value, updatedRegisteredSubject)
    }

    if (
      paperSubjectsId.value &&
      registeredSubjectsId.value != paperSubjectsId.value
    ) {
      const updatedPaperSubject = {
        SubjectId: paperSubjectsId.value,
        IsRegisteredSubject: false,
        IsPaperSubject: true,
      }
      await ApiService.updateSubject(studentId.value, updatedPaperSubject)
    }

    modal.value.toggle()
    showAlertModal('บันทึกสำเร็จ', 'success')
    await new Promise((resolve) => setTimeout(resolve, 1000))
    await router.push('/details')
  }
}

// Alert Modal
const isAlertModalOpen = ref(false)
const alertMessage = ref('')
const alertStatus = ref('')

const toggleAlertModal = () => {
  isAlertModalOpen.value = !isAlertModalOpen.value
}

const showAlertModal = (message, status) => {
  alertMessage.value = message
  alertStatus.value = status
  isAlertModalOpen.value = true
}

onMounted(async () => {
  const targetEl = document.getElementById('save-modal')
  modal.value = new Modal(targetEl)

  await getStudentAndSubjectsAndShortpapers()
})
</script>

<template>
  <div>
    <div class="text-bluemain text-left text-sm mt-5 font-semibold">
      <p>
        <RouterLink :to="'/details'">
          <span class="hover:text-blueheader">ข้อมูลนักศึกษา</span>
        </RouterLink>
        >
        <span class="font-bold text-sm">แก้ไขข้อมูลส่วนตัว</span>
      </p>
    </div>

    <div
      class="justify-center item-center bg-bluemain p-10 rounded-lg shadow-lg mt-5"
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
                  v-model="shortpaperTopic"
                  placeholder="ยังไม่ได้ระบุ"
                />
              </div>
            </div>
            <div class="mb-1">
              <label class="font-extrabold block" for="isSubject"
                >วิชาเลือก Workshop / Thesis / Project</label
              >
              <select
                id="registeredSubjectsId"
                class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                v-model="registeredSubjectsId"
              >
                <!-- <option disabled>ยังไม่ได้เลือกวิชา</option> -->
                <option
                  v-for="subject in subjects"
                  :key="subject.subjectId"
                  :value="subject.subjectId"
                >
                  {{ subject.subjectId }} {{ subject.subjectName }}
                </option>
              </select>
            </div>
            <div class="mb-1">
              <label class="font-extrabold block mb-2" for="workshopSubject"
                >วิชาจัดทำ IS Report / Thesis / Project</label
              >
              <select
                id="paperSubjectsId"
                class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                v-model="paperSubjectsId"
              >
                <!-- <option>ยังไม่ได้เลือกวิชา</option> -->
                <option
                  v-for="subject in subjects"
                  :key="subject.subjectId"
                  :value="subject.subjectId"
                >
                  {{ subject.subjectId }} {{ subject.subjectName }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-sm font-medium mt-[24px] flex gap-5 justify-end">
      <RouterLink :to="`/details`">
        <ButtonMain
          class="bg-error border hover:bg-white border-error hover:text-error"
          text="ยกเลิกการบันทึก"
        />
      </RouterLink>
      <ButtonMain
        class="bg-correct border hover:bg-white border-correct hover:text-correct"
        text="บันทึกการแก้ไข"
        @click="toggleModal"
      />
    </div>

    <ConfirmModal
      id="save-modal"
      @save="updateStudentAndShortpaper"
      @toggle="toggleModal"
      message="ต้องการแก้ไขหรือไม่"
      buttonColor="bg-amber-500 hover:bg-amber-600"
      iconColor="text-amber-500"
    />
  </div>

  <AlertModal
    :alertMessage="alertMessage"
    :is-alert-modal-open="isAlertModalOpen"
    :status="alertStatus"
    @toggle="toggleAlertModal"
  />
</template>

<style></style>
