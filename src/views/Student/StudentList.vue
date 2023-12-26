<script setup>
import { onMounted, ref } from 'vue'

import ApiService from '../../composables/apiService'

import SearchInput from '../../components/SearchInput.vue'
import Header from '../../components/Header.vue'
import EmptyData from '../../components/EmptyData.vue'

const students = ref([])

const getStudents = async () => {
  const res = await ApiService.getStudents()

  if (res.status === 200) {
    const data = await res.data
    students.value = data
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

const searchKeyword = async (keyword) => {
  if (keyword == null || keyword == undefined || keyword == '') {
    await getStudents()
  } else {
    const res = await ApiService.searchStudent(keyword)
    if (res.status === 200) {
      const data = await res.data
      students.value = data
    }
  }
}

onMounted(async () => {
  await getStudents()
})
</script>

<template>
  <div>
    <Header header="ข้อมูลนักศึกษา" />
    <div class="p-5 shadow-md">
      <SearchInput
        @searchKeyword="searchKeyword"
        placeholder="กรอกรหัสนักศึกษา ชื่อ นามสกุล หรืออีเมล"
        label="ค้นหานักศึกษา"
      />
    </div>

    <div
      class="relative overflow-x-auto shadow-md sm:rounded-lg mt-6"
      v-if="students.length !== 0"
    >
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
              <div v-if="isFileStatusValid(student.fileStatus)">
                <div
                  v-if="student.fileStatus.bOne === 0"
                  v-html="wrongIconSvg"
                ></div>
                <div v-else v-html="correctIconSvg"></div>
              </div>
            </td>
            <td class="px-6 py-4">
              <div v-if="isFileStatusValid(student.fileStatus)">
                <div
                  v-if="student.fileStatus.paperOne === 0"
                  v-html="wrongIconSvg"
                ></div>
                <div v-else v-html="correctIconSvg"></div>
              </div>
            </td>
            <td class="px-6 py-4">
              <div v-if="isFileStatusValid(student.fileStatus)">
                <div
                  v-if="student.fileStatus.paperTwo === 0"
                  v-html="wrongIconSvg"
                ></div>
                <div v-else v-html="correctIconSvg"></div>
              </div>
            </td>
            <td class="px-6 py-4">
              <div v-if="isFileStatusValid(student.fileStatus)">
                <div
                  v-if="student.fileStatus.article === 0"
                  v-html="wrongIconSvg"
                ></div>
                <div v-else v-html="correctIconSvg"></div>
              </div>
            </td>
            <td class="px-6 py-4">
              <div v-if="isFileStatusValid(student.fileStatus)">
                <div
                  v-if="student.fileStatus.final === 0"
                  v-html="wrongIconSvg"
                ></div>
                <div v-else v-html="correctIconSvg"></div>
              </div>
            </td>
            <td class="px-6 py-4">
              <div v-if="isFileStatusValid(student.fileStatus)">
                <div
                  v-if="student.fileStatus.copyright === 0"
                  v-html="wrongIconSvg"
                ></div>
                <div v-else v-html="correctIconSvg"></div>
              </div>
            </td>
            <td class="px-6 py-4">
              <div v-if="isFileStatusValid(student.fileStatus)">
                <div
                  v-if="student.fileStatus.robbery === 0"
                  v-html="wrongIconSvg"
                ></div>
                <div v-else v-html="correctIconSvg"></div>
              </div>
            </td>
            <!-- </RouterLink> -->
            <td class="px-6 py-4 text-right">
              <RouterLink
                :to="`/student?id=${student.userId}`"
                class="font-medium text-bluemain hover:underline"
                >รายละเอียด</RouterLink
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <EmptyData message="ไม่มีข้อมูลนักศึกษา" v-else />
  </div>
</template>

<style></style>
