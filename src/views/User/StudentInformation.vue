<script setup>
import ApiService from '../../composables/apiService'
import { onBeforeMount, ref } from 'vue'

const student = ref({})

const getStudent = async () => {
  const res = await ApiService.getStudentById(1)

  if (res.status === 200) {
    const data = await res.data
    student.value = data
  }
}

onBeforeMount(async () => {
  await getStudent()
})
</script>

<template>
  <div>
    <!-- <div class="p-1 mt-5 shadow-md">
      <form>
        <label for="student-search" class="font-medium">รหัสนักศึกษา</label>
        <div class="relative">
          <div
            class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
          >
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="student-search"
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="กรอกรหัสนักศึกษา"
            required
          />
          <button
            type="submit"
            class="text-white absolute end-2.5 bottom-2.5 bg-bluebtn hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
    </div> -->
    <div class="mt-5">
      <div class="p-1 shadow-md">
        <h1>ข้อมูลนักศึกษา</h1>
        <hr />
        <table class="table-auto">
          <tbody>
            <tr>
              <td>รหัสนักศึกษา</td>
              <td>{{ student.studentId }}</td>
            </tr>
            <tr>
              <td>ชื่อ - นามสกุล</td>
              <td>{{ student.firstname }} {{ student.lastname }}</td>
            </tr>
            <tr>
              <td>เบอร์โทรศัพท์</td>
              <td>{{ student.phoneNumber }}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{{ student.email }}</td>
            </tr>
            <tr>
              <td>ชื่อหัวข้อโครงงาน</td>
              <td>{{ student.projectName }}</td>
            </tr>
            <tr>
              <td>รายวิชาจัดทำ IS Report</td>
              <td>
                {{ student.registeredSubject.subjectId }}
                {{ student.registeredSubject.subjectName }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="p-1 shadow-md mt-5">
          <h1>ข้อมูลการ Upload File</h1>
          <hr />
          <table class="table-auto">
            <tbody>
              <tr>
                <td>อัปโหลดเอกสาร ใบ บ.1</td>
                <td>
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
              </tr>
              <tr>
                <td>อัปโหลดเอกสารโครงงานครั้งที่ 1</td>
                <td><div v-if="student.fileStatus.paperOne == 0">
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
                  </div></td>
              </tr>
              <tr>
                <td>อัปโหลดเอกสารโครงงานครั้งที่ 2</td>
                <td><div v-if="student.fileStatus.paperTwo == 0">
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
                  </div></td>
              </tr>
              <tr>
                <td>
                  อัปโหลดเอกสารโครงงานในรูปแบบของบทความ
                  (ฉบับเกี่ยวข้องกับห้องสมุด)
                </td>
                <td>
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
              </tr>
              <tr>
                <td>อัปโหลดเอกสารโครงงานฉบับสมบูรณ์</td>
                <td><div v-if="student.fileStatus.final == 0">
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
                  </div></td>
              </tr>
              <tr>
                <td>อัปโหลดใบโอนลิขสิทธิ์</td>
                <td><div v-if="student.fileStatus.copyright == 0">
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
                  </div></td>
              </tr>
              <tr>
                <td>
                  อัปโหลดเอกสารข้อตกลงเพื่อการหลีกเลี่ยงการโจรกรรมทางวรรณกรรม
                </td>
                <td><div v-if="student.fileStatus.robbery == 0">
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
                  </div></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  </div>
</template>

<style></style>
