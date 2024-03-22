<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Modal } from 'flowbite'
import { useValidateStore } from '../../stores/validate'

import ApiService from '../../composables/apiService'

import Header from '../../components/Header.vue'
import ConfirmButton from '../../components/ConfirmButton.vue'
import ConfirmModal from '../../components/ConfirmModal.vue'
import ButtonMain from '../../components/ButtonMain.vue'

const route = useRoute()
const router = useRouter()
const store = useValidateStore()

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

      combinedSubject.value = `${data.data.subjects.subjectId} ${data.data.subjects.subjectName}`
    }
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
    await ApiService.updateStudent(student.value.studentId, student.value)
    modal.value.toggle()
    alert('บันทึกสำเร็จ')
    router.push('/student?id=' + student.value.studentId)
  }
}

onBeforeMount(async () => {
  await getStudent()

  const targetEl = document.getElementById('save-modal')
  modal.value = new Modal(targetEl)
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
            <div class="my-2">
              <label for="studentId" class="mr-[16px] font-extrabold"
                >รหัสนักศึกษา:</label
              >
              <input
                type="text"
                id="studentId"
                v-model="student.studentId"
                disabled
                class="border border-gray-400 rounded-lg w-[300px] disabled:bg-gray-200 disabled:text-gray-500 text-sm"
              />
            </div>

            <div class="my-2">
              <label for="firstName" class="mr-[16px] font-extrabold"
                >ชื่อ<span class="text-red-600">*</span>:</label
              >
              <input
                type="text"
                id="firstName"
                v-model="student.firstname"
                class="border border-gray-400 rounded-lg w-[300px] disabled:bg-gray-200 disabled:text-gray-500 text-sm"
              />
              <p
                v-if="student.firstname == ''"
                class="text-red-600 text-sm mt-1"
              >
                กรุณาใส่ชื่อ
              </p>
            </div>

            <div class="my-2">
              <label for="lastname" class="mr-[16px] font-extrabold"
                >นามสกุล<span class="text-red-600">*</span>:</label
              >
              <input
                type="text"
                id="lastname"
                v-model="student.lastname"
                class="border border-gray-400 rounded-lg w-[300px] disabled:bg-gray-200 disabled:text-gray-500 text-sm"
              />
              <p
                v-if="student.lastname == ''"
                class="text-red-600 text-sm mt-1"
              >
                กรุณาใส่นามสกุล
              </p>
            </div>

            <div class="my-2">
              <label for="email" class="mr-[16px] font-extrabold">อีเมล:</label>
              <input
                type="text"
                id="email"
                v-model="student.email"
                disabled
                class="border border-gray-400 rounded-lg w-[300px] disabled:bg-gray-200 disabled:text-gray-500 text-sm"
              />
            </div>

            <div class="my-2">
              <label for="alternativeEmail" class="mr-[16px] font-extrabold"
                >อีเมลสำรอง:</label
              >
              <input
                type="text"
                id="alternativeEmail"
                v-model="student.alternativeEmail"
                class="border border-gray-400 rounded-lg w-[300px] disabled:bg-gray-200 disabled:text-gray-500 text-sm"
              />
            </div>

            <div class="my-2">
              <label for="phonenumber" class="mr-[16px] font-extrabold"
                >เบอร์โทรศัพท์<span class="text-red-600">*</span>:</label
              >
              <input
                type="text"
                id="phonenumber"
                v-model="student.phonenumber"
                class="border border-gray-400 rounded-lg w-[300px] disabled:bg-gray-200 disabled:text-gray-500 text-sm"
              />
              <p
                v-if="student.phonenumber == ''"
                class="text-red-600 text-sm mt-1"
              >
                กรุณาใส่เบอร์โทรศัพท์
              </p>
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
                  :value="student.shortpaper.shortpaperTopic"
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
              >
                <option disabled>ยังไม่ได้เลือกวิชา</option>
                <option
                  v-for="subject in subjects"
                  :key="subject.subjectId"
                  :value="subject.subjectId"
                  :selected="subject.subjectId === student.subjects.subjectId"
                >
                  {{ subject.subjectId }} {{ subject.subjectName }}
                </option>
              </select>
            </div>

            <p>
              <span class="font-extrabold"
                >วิชาจัดทำ IS Report / Thesis / Project</span
              >
              {{ student.subjects.subjectId }}
              {{ student.subjects.subjectName }}
            </p>
            <p>
              <span class="font-extrabold"
                >วิชาเลือก Workshop / Thesis / Project</span
              >
              {{ student.subjects.subjectId }}
              {{ student.subjects.subjectName }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="text-sm font-medium mt-[24px] flex gap-5 justify-end">
      <ButtonMain
        class="bg-error border hover:bg-white hover:border-error hover:text-error"
        text="ยกเลิกการบันทึก"
      />
      <ButtonMain
        class="bg-correct border hover:bg-white hover:border-correct hover:text-correct"
        text="บันทึกการแก้ไข"
        @click="toggleModal"
      />
      <!-- <ConfirmButton @click="toggleModal" /> -->
    </div>

    <ConfirmModal
      id="save-modal"
      @save="updateStudent(student.studentId, student)"
      @toggle="toggleModal"
      message="ต้องการแก้ไขหรือไม่"
      buttonColor="bg-amber-500 hover:bg-amber-600"
      iconColor="text-amber-500"
    />
  </div>

  <!-- <div>
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
  </div> -->
</template>

<style></style>
