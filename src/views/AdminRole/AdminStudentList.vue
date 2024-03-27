<script setup>
import { onMounted, ref } from 'vue'

import ApiService from '../../composables/apiService'

import SearchInput from '../../components/SearchInput.vue'
import Header from '../../components/Header.vue'
import EmptyData from '../../components/EmptyData.vue'
import ButtonMain from '../../components/ButtonMain.vue'

const students = ref([])
const fileType = ref([])

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

const getStudents = async () => {
  const res = await ApiService.getStudents()

  if (res.status === 200) {
    const data = await res.data
    students.value = data.data
  }
}

const getFileType = async () => {
  const res = await ApiService.getFileType()

  if (res.status === 200) {
    const data = await res.data
    fileType.value = data.data
  }
}

const searchKeyword = async (keyword) => {
  if (keyword == null || keyword == undefined || keyword == '') {
    await getStudents()
  } else {
    const res = await ApiService.searchStudents(keyword)
    if (res.status === 200) {
      const data = await res.data
      students.value = data.data
    }
  }
}

const hasFileWithId = (filesArray, fileId) => {
  return filesArray.some((file) => file.shortpaperFileTypeId === fileId)
}

onMounted(async () => {
  await searchKeyword()
  await getFileType()
})
</script>

<template>
  <div>
    <Header class="text-sm rounded-md" header="ข้อมูลนักศึกษา" />
    <div class="flex justify-end items-end w-full my-5">
      <RouterLink :to="`/admin/adddata`">
        <ButtonMain
          class="bg-bluemain border hover:bg-white border-bluemain hover:text-bluemain"
          text="เพิ่มนักศึกษา"
        />
      </RouterLink>
    </div>
    <div class="p-5 shadow-md text-sm">
      <SearchInput
        @searchKeyword="searchKeyword"
        placeholder="กรอกรหัสนักศึกษา ชื่อ นามสกุล หรืออีเมล"
        label="ค้นหานักศึกษา"
      />
    </div>
    <div
      class="relative overflow-x-auto shadow-md rounded-lg mt-6"
      v-if="students !== null"
    >
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">รหัสนักศึกษา</th>
            <th scope="col" class="px-6 py-3">ชื่อ - นามสกุล</th>
            <th scope="col" class="px-6 py-3">รายวิชา</th>

            <!-- file type -->
            <th
              scope="col"
              class="px-6 py-3"
              v-for="type in fileType"
              :key="type.typeId"
            >
              {{ type.typeName }}
            </th>

            <th scope="col" class="px-6 py-3">
              <span class="sr-only">รายละเอียด</span>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            class="bg-white border-b hover:bg-gray-50"
            v-for="student in students"
            :key="student.studentId"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {{ student.studentId }}
            </th>
            <td class="px-6 py-4">
              {{ student.firstname }} {{ student.lastname }}
            </td>
            <td class="px-6 py-4" v-if="student.subjects.length !== 0">
              <ul>
                <li v-for="subject in student.subjects" class="mb-2">
                  {{ subject.subjectId }}
                  {{ subject.subjectName }}
                  <span v-if="subject.isRegisteredSubject">
                    : วิชาที่ลงทะเบียน</span
                  >
                  <span v-if="subject.isPaperSubject">
                    : วิชาที่ทำ IS Report</span
                  >
                </li>
              </ul>
            </td>
            <td v-else class="text-center">-</td>

            <td class="px-6 py-4">
              <div v-if="student.shortpaperFiles !== null">
                <div
                  v-if="hasFileWithId(student.shortpaperFiles, 1)"
                  v-html="correctIconSvg"
                ></div>
                <div v-else v-html="wrongIconSvg"></div>
              </div>
            </td>

            <td class="px-6 py-4">
              <div v-if="student.shortpaperFiles !== null">
                <div
                  v-if="hasFileWithId(student.shortpaperFiles, 2)"
                  v-html="correctIconSvg"
                ></div>
                <div v-else v-html="wrongIconSvg"></div>
              </div>
            </td>

            <td class="px-6 py-4">
              <div v-if="student.shortpaperFiles !== null">
                <div
                  v-if="hasFileWithId(student.shortpaperFiles, 3)"
                  v-html="correctIconSvg"
                ></div>
                <div v-else v-html="wrongIconSvg"></div>
              </div>
            </td>

            <td class="px-6 py-4">
              <div v-if="student.shortpaperFiles !== null">
                <div
                  v-if="hasFileWithId(student.shortpaperFiles, 4)"
                  v-html="correctIconSvg"
                ></div>
                <div v-else v-html="wrongIconSvg"></div>
              </div>
            </td>

            <td class="px-6 py-4">
              <div v-if="student.shortpaperFiles !== null">
                <div
                  v-if="hasFileWithId(student.shortpaperFiles, 5)"
                  v-html="correctIconSvg"
                ></div>
                <div v-else v-html="wrongIconSvg"></div>
              </div>
            </td>

            <td class="px-6 py-4">
              <div v-if="student.shortpaperFiles !== null">
                <div
                  v-if="hasFileWithId(student.shortpaperFiles, 6)"
                  v-html="correctIconSvg"
                ></div>
                <div v-else v-html="wrongIconSvg"></div>
              </div>
            </td>

            <td class="px-6 py-4">
              <div v-if="student.shortpaperFiles !== null">
                <div
                  v-if="hasFileWithId(student.shortpaperFiles, 7)"
                  v-html="correctIconSvg"
                ></div>
                <div v-else v-html="wrongIconSvg"></div>
              </div>
            </td>

            <td class="px-6 py-4 text-right">
              <RouterLink :to="`/admin/student/${student.studentId}`"
                ><ButtonMain
                  class="bg-bluemain border hover:bg-white border-bluemain hover:text-bluemain"
                  text="รายละเอียด"
                />
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <EmptyData message="ไม่มีข้อมูลนักศึกษา" v-else />
  </div>
</template>

<style></style>
