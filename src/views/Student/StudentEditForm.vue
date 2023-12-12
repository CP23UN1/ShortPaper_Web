<script setup>
import ApiService from '../../composables/apiService'
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const subjects = ref([])
const student = ref({})
const combinedShortPaperSubject = ref()
const combinedRegisSubject = ref()

// const showModal = ref(false)
// const modalMessage = ref()

// Validation
const errors = ref({
  firstName: '',
  lastName: '',
})

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
    // showModal.value = true
    // modalMessage.value = 'บันทึกสำเร็จ'
    // alert('successfully updated')
  } catch (error) {
    alert('Error updating student:', error)
  }
}

onMounted(async () => {
  await getStudent()
  await getSubjects()

  combinedShortPaperSubject.value =
    student.value.shortpaperSubject.subjectId +
    ' ' +
    student.value.shortpaperSubject.subjectName

  combinedRegisSubject.value =
    student.value.registeredSubject.subjectId +
    ' ' +
    student.value.registeredSubject.subjectName
})
</script>

<template>
  <div>
    <div class="mt-5 font-semibold">
      <div class="text-bluemain text-center">
        <p>
          <RouterLink :to="'/'">
            <span
              class="hover:text-white hover:bg-bluemain hover:p-2 rounded-lg"
              >ข้อมูลนักศึกษาทั้งหมด</span
            >
          </RouterLink>
          >
          <RouterLink :to="`/student?id=${student.userId}`">
            <span
              class="hover:text-white hover:bg-bluemain hover:p-2 rounded-lg"
              >ข้อมูลนักศึกษา</span
            >
          </RouterLink>
          >
          <span class="font-bold">แก้ไขข้อมูลนักศึกษา</span>
        </p>
      </div>
      <div class="bg-bluemain text-white p-4 mb-3 text-lg mt-5">
        <h1>ข้อมูลนักศึกษา</h1>
      </div>
    </div>
    
    <form
      class="mt-[24px] text-black text-base font-medium font-['Sarabun'] grid"
    >
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
        <!--  -->
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
        <!--  -->
        <div class="mt-3">
          <div>
            <label for="email">อีเมล <span class="text-red-600">*</span></label>
          </div>
          <div>
            <input
              type="email"
              id="email"
              v-model="student.email"
              class="border border-gray-400 rounded-[4px] w-[250px]"
            />
            <p v-if="student.email == ''" class="text-red-600 text-sm">
              กรุณาใส่อีเมล
            </p>
          </div>
        </div>
        <!--  -->
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
              v-model="student.phoneNumber"
              class="border border-gray-400 rounded-[4px] w-[250px]"
            />
            <p v-if="student.phoneNumber == ''" class="text-red-600 text-sm">
              กรุณาใส่เบอร์โทรศัพท์
            </p>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="bg-bluemain text-white p-4 my-3 text-lg">โครงงานที่จัดทำ</div>
      <div class="grid grid-cols-3 bg-white p-[24px] rounded-[4px] shadow-md">
        <div>
          <div>
            <label for="projectName"
              >ชื่อหัวข้อโครงงาน <span class="text-red-600">*</span></label
            >
          </div>
          <div>
            <input
              type="text"
              id="projectName"
              v-model="student.projectName"
              class="border border-gray-400 rounded-[4px] w-[250px]"
            />
            <p v-if="student.projectName == ''" class="text-red-600 text-sm">
              กรุณาใส่หัวข้อโครงงาน
            </p>
          </div>
        </div>
        <!--  -->
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
              v-model="combinedShortPaperSubject"
              disabled
              class="border border-gray-400 rounded-[4px] w-[250px]"
            />
            <!-- <select
            id="workshopSubject"
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
          </select> -->
          </div>
        </div>

        <div>
          <div>
            <label for="registerSubject"
              >วิชาเลือก IS Report / Thesis / Project</label
            >
          </div>
          <div>
            <input
              type="text"
              id="registerSubject"
              v-model="combinedRegisSubject"
              disabled
              class="border border-gray-400 rounded-[4px] w-[250px]"
            />
            <!-- <select
            id="reportSubject"
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
          </select> -->
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
        <!-- <button
          type="submit"
          class="text-teal-700 border border-teal-700 rounded-[4px] px-[40px] py-[5px] hover:bg-teal-700 hover:text-white"
          @click="updateStudent(student.userId, student)"
        >
          บันทึก
        </button> -->
        <button
          data-modal-target="popup-modal"
          data-modal-toggle="popup-modal"
          class="text-teal-700 border border-teal-700 rounded-[4px] px-[40px] py-[5px] hover:bg-teal-700 hover:text-white"
          type="submit"
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

    <div
      id="popup-modal"
      tabindex="-1"
      class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow">
          <button
            type="button"
            class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            data-modal-hide="popup-modal"
          >
            <svg
              class="w-3 h-3"
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
            </svg>
            <span class="sr-only">ปิดหน้าต่าง</span>
          </button>
          <div class="p-4 md:p-5 text-center">
            <svg
              class="mx-auto mb-4 text-amber-500 w-12 h-12"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 class="mb-5 text-lg font-normal text-gray-500">
              ต้องการแก้ไขหรือไม่
            </h3>
            <button
              data-modal-hide="popup-modal"
              type="button"
              class="text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
              @click="updateStudent(student.userId, student)"
            >
              บันทึก
            </button>
            <button
              data-modal-hide="popup-modal"
              type="button"
              class="text-red-700 bg-white hover:bg-red-700 hover:text-white rounded-lg border border-red-700 text-sm font-medium px-5 py-2.5 focus:z-10"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
