<script setup>
import { onMounted, ref, computed, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Modal } from 'flowbite'

import ApiService from '../../composables/apiService'

import Header from '../../components/Header.vue'
import ConfirmButton from '../../components/ConfirmButton.vue'
import ConfirmModal from '../../components/ConfirmModal.vue'

const route = useRoute()
const router = useRouter()
const student = ref({})
const combinedSubject = ref()

const modal = ref()
const toggleModal = () => {
  modal.value.toggle()
}

const getStudent = async () => {
  if (route.query.id) {
    const id = route.query.id
    const res = await ApiService.getStudentById(id)

    if (res.status === 200) {
      const data = await res.data
      student.value = data.data
    }
  }
}

const validateEmail = (email) => {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (email.match(validRegex)) {
    return true
  } else {
    return false
  }
}

const validateData = () => {
  let isValid = true
  if (student.value.firstname == '' || null) {
    alert('กรุณาใส่ชื่อ')
    isValid = false
  }

  if (student.value.lastname == '' || null) {
    alert('กรุณาใส่นามสกุล')
    isValid = false
  }

  // if (student.value.alternativeEmail == '' || null) {
  //   alert('กรุณาใส่อีเมล')
  //   isValid = false
  // } else {
  if (student.value.alternativeEmail !== '' && null) {
    if (validateEmail(student.value.alternativeEmail) !== true) {
      alert('กรุณาใส่อีเมลที่ถูกต้อง')
      isValid = false
    }
  }
  // }

  if (student.value.phonenumber == '' || null) {
    alert('กรุณาใส่เบอร์โทรศัพท์')
    isValid = false
  } else {
    if (student.value.phonenumber.length !== 10) {
      alert('กรุณาใส่เบอร์โทรศัพท์ที่ถูกต้อง')
      isValid = false
    }
  }

  if (student.value.shortpaper.shortpaperTopic == '' || null) {
    alert('กรุณาใส่หัวข้อโครงงาน')
    isValid = false
  }

  return isValid
}

const updateStudent = async () => {
  if (validateData() == true) {
    await ApiService.updateStudent(student.value.studentId, student.value)
    modal.value.toggle()
    alert('บันทึกสำเร็จ')
    router.push('/student?id=' + student.value.studentId)
  }
}

onBeforeMount(async () => {
  await getStudent()

  // ยังจัดการไม่ดี
  combinedSubject.value =
    student.value.subjects[0].subjectId +
    ' ' +
    student.value.subjects[0].subjectName

  const targetEl = document.getElementById('save-modal')
  modal.value = new Modal(targetEl)
})
</script>

<template>
  <div>
    <div class="mt-5 font-semibold">
      <div class="text-bluemain text-left text-sm">
        <p>
          <RouterLink :to="'/students'">
            <span class="hover:text-blueheader">ข้อมูลนักศึกษาทั้งหมด</span>
          </RouterLink>
          >
          <RouterLink :to="`/student?id=${route.query.id}`">
            <span class="hover:text-blueheader">ข้อมูลนักศึกษา</span>
          </RouterLink>
          >
          <RouterLink :to="`/student/edit?id=${route.query.id}`">
            <span class="font-bold">แก้ไขข้อมูลนักศึกษา</span>
          </RouterLink>
        </p>
      </div>
    </div>

    <Header header="ข้อมูลนักศึกษา" />

    <form
      class="mt-[24px] text-black text-base font-medium font-['Sarabun'] grid"
    >
      <div class="grid grid-cols-3 bg-white p-[24px] rounded-[4px] shadow-md">
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
              class="border border-gray-400 rounded-[4px] w-[250px] bg-gray-200 text-gray-500"
            />
          </div>
        </div>

        <div>
          <div>
            <label for="firstName" class="mr-[16px]"
              >ชื่อ <span class="text-red-600">*</span></label
            >
          </div>
          <div>
            <input
              type="text"
              id="firstName"
              v-model="student.firstname"
              class="border border-gray-400 rounded-[4px] w-[250px]"
            />
            <p v-if="student.firstname == ''" class="text-red-600 text-sm">
              กรุณาใส่ชื่อ
            </p>
          </div>
        </div>

        <div>
          <div>
            <label for="lastName" class="mr-[16px]"
              >นามสกุล <span class="text-red-600">*</span></label
            >
          </div>
          <div>
            <input
              type="text"
              id="lastName"
              v-model="student.lastname"
              class="border border-gray-400 rounded-[4px] w-[250px]"
            />
            <p v-if="student.lastname == ''" class="text-red-600 text-sm">
              กรุณาใส่นามสกุล
            </p>
          </div>
        </div>

        <div class="mt-3">
          <div>
            <label for="email">อีเมล <span class="text-red-600">*</span></label>
          </div>
          <div>
            <input
              type="email"
              id="email"
              v-model="student.email"
              disabled
              class="border border-gray-400 rounded-[4px] w-[280px] bg-gray-200 text-gray-500"
            />
          </div>
        </div>

        <div class="mt-3">
          <div>
            <label for="alternativeEmail">อีเมลสำรอง</label>
          </div>
          <div>
            <input
              type="email"
              id="alternativeEmail"
              v-model="student.alternativeEmail"
              class="border border-gray-400 rounded-[4px] w-[280px]"
            />
          </div>
        </div>

        <div class="mt-3">
          <div>
            <label for="phone" class="mr-[16px]"
              >เบอร์โทรศัพท์ <span class="text-red-600">*</span></label
            >
          </div>
          <div>
            <input
              type="text"
              id="phone"
              v-model="student.phonenumber"
              class="border border-gray-400 rounded-[4px] w-[250px]"
            />
            <p v-if="student.phonenumber == ''" class="text-red-600 text-sm">
              กรุณาใส่เบอร์โทรศัพท์
            </p>
          </div>
        </div>
      </div>

      <Header header="โครงงานที่จัดทำ" />

      <div class="grid grid-cols-3 bg-white p-[24px] rounded-[4px] shadow-md">
        <div>
          <div>
            <label for="shortpaperTopic"
              >ชื่อหัวข้อโครงงาน <span class="text-red-600">*</span></label
            >
          </div>
          <div>
            <input
              type="text"
              id="shortpaperTopic"
              v-model="student.shortpaper.shortpaperTopic"
              class="border border-gray-400 rounded-[4px] w-[400px]"
            />
            <p
              v-if="student.shortpaper.shortpaperTopic == '' || null"
              class="text-red-600 text-sm"
            >
              กรุณาใส่หัวข้อโครงงาน
            </p>
          </div>
        </div>

        <div>
          <div>
            <label for="shortpapersubject"
              >วิชาจัดทำ IS Report / Thesis / Project</label
            >
          </div>
          <div>
            <input
              type="text"
              id="shortpapersubject"
              v-model="combinedSubject"
              disabled
              class="border border-gray-400 rounded-[4px] w-[330px] bg-gray-200 text-gray-500"
            />
          </div>
        </div>
      </div>

      <div class="text-sm font-medium space-x-4 mt-[24px] text-end">
        <ConfirmButton @click="toggleModal" />
      </div>
    </form>

    <ConfirmModal
      id="save-modal"
      @save="updateStudent(student.studentId, student)"
      @toggle="toggleModal"
      message="ต้องการแก้ไขหรือไม่"
      buttonColor="bg-amber-500 hover:bg-amber-600"
      iconColor="text-amber-500"
    />
  </div>
</template>

<style></style>
