<script setup>
import { onMounted, ref } from 'vue'
import ApiService from '../../composables/apiService'

const students = ref([])

onMounted(async () => {
  // User API
  const studentsResponse = await ApiService.getStudents()
  students.value = studentsResponse.data
})
</script>

<template>
  <div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">รหัสนักศึกษา</th>
            <th scope="col" class="px-6 py-3">ชื่อ - นามสกุล</th>
            <th scope="col" class="px-6 py-3">รายวิชา</th>
            <th scope="col" class="px-6 py-3">ใบ บ.1</th>
            <th scope="col" class="px-6 py-3">ส่งครั้งที่ 1</th>
            <th scope="col" class="px-6 py-3">ส่งครั้งที่ 2</th>
            <th scope="col" class="px-6 py-3">รูปเล่มบทความ</th>
            <th scope="col" class="px-6 py-3">ฉบับสมบูรณ์</th>
            <th scope="col" class="px-6 py-3">ใบโอนลิขสิทธิ์</th>
            <th scope="col" class="px-6 py-3">ใบโจรกรรม</th>
            <th scope="col" class="px-6 py-3">
              <span class="sr-only">รายละเอียด</span>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            v-for="student in students"
            :key="student.userId"
          >
            <!-- <RouterLink :to="'/student'" class="px-6 py-3"> -->
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ student.studentId }}
            </th>
            <td class="px-6 py-4">
              {{ student.firstname }} {{ student.lastname }}
            </td>
            <td>
              {{ student.registeredSubject.subjectId }}
              {{ student.registeredSubject.subjectName }}
            </td>
            <td class="px-6 py-4">
              <div v-if="student.fileStatus.bOne == 0">
                <svg
                  class="w-[15px] h-[15px] text-red-600 dark:text-white"
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
              </div>
              <div v-else>
                <svg
                  class="w-[17px] h-[17px] text-lime-600 dark:text-white"
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
                </svg>
              </div>
            </td>
            <td class="px-6 py-4">
              <div v-if="student.fileStatus.paperOne == 0">
                <svg
                  class="w-[15px] h-[15px] text-red-600 dark:text-white"
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
              </div>
              <div v-else>
                <svg
                  class="w-[17px] h-[17px] text-lime-600 dark:text-white"
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
                </svg>
              </div>
            </td>
            <td class="px-6 py-4">
              <div v-if="student.fileStatus.paperTwo == 0">
                <svg
                  class="w-[15px] h-[15px] text-red-600 dark:text-white"
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
              </div>
              <div v-else>
                <svg
                  class="w-[17px] h-[17px] text-lime-600 dark:text-white"
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
                </svg>
              </div>
            </td>
            <td class="px-6 py-4">
              <div v-if="student.fileStatus.article == 0">
                <svg
                  class="w-[15px] h-[15px] text-red-600 dark:text-white"
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
              </div>
              <div v-else>
                <svg
                  class="w-[17px] h-[17px] text-lime-600 dark:text-white"
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
                </svg>
              </div>
            </td>
            <td class="px-6 py-4">
              <div v-if="student.fileStatus.final == 0">
                <svg
                  class="w-[15px] h-[15px] text-red-600 dark:text-white"
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
              </div>
              <div v-else>
                <svg
                  class="w-[17px] h-[17px] text-lime-600 dark:text-white"
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
                </svg>
              </div>
            </td>
            <td class="px-6 py-4">
              <div v-if="student.fileStatus.copyright == 0">
                <svg
                  class="w-[15px] h-[15px] text-red-600 dark:text-white"
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
              </div>
              <div v-else>
                <svg
                  class="w-[17px] h-[17px] text-lime-600 dark:text-white"
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
                </svg>
              </div>
            </td>
            <td class="px-6 py-4">
              <div v-if="student.fileStatus.robbery == 0">
                <svg
                  class="w-[15px] h-[15px] text-red-600 dark:text-white"
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
              </div>
              <div v-else>
                <svg
                  class="w-[17px] h-[17px] text-lime-600 dark:text-white"
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
                </svg>
              </div>
            </td>
            <!-- </RouterLink> -->
            <td class="px-6 py-4 text-right">
              <RouterLink :to="`/student?id=${student.userId}`" class="font-medium text-bluemain hover:underline"
                >รายละเอียด</RouterLink
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style></style>
