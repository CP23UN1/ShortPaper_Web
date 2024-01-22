<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount, ref } from 'vue'

import ApiService from '../../composables/apiService'

import Header from '../../components/Header.vue'
import ButtonMain from '../../components/ButtonMain.vue'
import SearchInput from '../../components/SearchInput.vue'

const student = ref({})
const route = useRoute()
const router = useRouter()

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

onBeforeMount(async () => {
  await getStudent()
})
</script>

<template>
  <div class="mt-5 font-semibold">
    <div class="text-bluemain text-left text-sm">
      <p>
        <RouterLink :to="'/studentinfo'">
          <span class="hover:text-blueheader">ตรวจสอบข้อมูล(รายบุคคล)</span>
        </RouterLink>
      </p>
    </div>
    <div class="bg-white p-2">
      <SearchInput class="w-96" label="รหัสนักศึกษา"/>{{รหัสนักศึกษา}}
    </div>
    <div class="mt-3 justify-center item-center mb-12 grid grid-cols-2 text-sm w-full">
      <div class="shadow-md">
        <h1 class="my-2 ml-2">ข้อมูลนักศึกษา</h1>
        <hr />
        <table class="table-auto my-2 ml-2">
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
              <td>
                {{ student.phoneNumber == null ? '-' : student.phoneNumber }}
              </td>
            </tr>
            <tr>
              <td>อีเมล</td>
              <td>{{ student.email }}</td>
            </tr>
            <tr>
              <td>อีเมลสำรอง</td>
              <td>
                {{
                  student.alternativeEmail == null
                  ? '-'
                  : student.alternativeEmail
                }}
              </td>
            </tr>
            <tr>
              <td class="pr-16">ชื่อหัวข้อโครงงาน</td>
              <td>
                {{ student.projectName == null ? '-' : student.projectName }}
              </td>
            </tr>
            <!-- <tr>
              <td class="pr-16">รายวิชาจัดทำ IS Report</td>
              <td>
                <div v-if="student.registeredSubject">
                  {{ student.registeredSubject.subjectId }}
                  {{ student.registeredSubject.subjectName }}
                </div>
                <div v-else>-</div>
              </td>
            </tr> -->
          </tbody>
        </table>
      </div>
      <div class="shadow-md">
        <h1 class="my-2 ml-2">ข้อมูลการ Upload File</h1>
        <hr />
        <table class="table-auto my-2 ml-2">
          <tbody>
            <tr>
              <td>อัปโหลดเอกสาร ใบ บ.1</td>
              <td v-if="isFileStatusValid(student.fileStatus)">
                <div v-if="student.fileStatus.bOne === 0" v-html="wrongIconSvg"></div>
                <div v-else v-html="correctIconSvg"></div>
              </td>
            </tr>
            <tr>
              <td>อัปโหลดเอกสารโครงงานครั้งที่ 1</td>
              <td v-if="isFileStatusValid(student.fileStatus)">
                <div v-if="student.fileStatus.paperOne === 0" v-html="wrongIconSvg"></div>
                <div v-else v-html="correctIconSvg"></div>
              </td>
            </tr>
            <tr>
              <td>อัปโหลดเอกสารโครงงานครั้งที่ 2</td>
              <td v-if="isFileStatusValid(student.fileStatus)">
                <div v-if="student.fileStatus.paperTwo === 0" v-html="wrongIconSvg"></div>
                <div v-else v-html="correctIconSvg"></div>
              </td>
            </tr>
            <tr>
              <td class="pr-16">
                อัปโหลดเอกสารโครงงานในรูปแบบของบทความ
                (ฉบับเกี่ยวข้องกับห้องสมุด)
              </td>
              <td v-if="isFileStatusValid(student.fileStatus)">
                <div v-if="student.fileStatus.article === 0" v-html="wrongIconSvg"></div>
                <div v-else v-html="correctIconSvg"></div>
              </td>
            </tr>
            <tr>
              <td>อัปโหลดเอกสารโครงงานฉบับสมบูรณ์</td>
              <td v-if="isFileStatusValid(student.fileStatus)">
                <div v-if="student.fileStatus.final === 0" v-html="wrongIconSvg"></div>
                <div v-else v-html="correctIconSvg"></div>
              </td>
            </tr>
            <tr>
              <td>อัปโหลดใบโอนลิขสิทธิ์</td>
              <td v-if="isFileStatusValid(student.fileStatus)">
                <div v-if="student.fileStatus.copyright === 0" v-html="wrongIconSvg"></div>
                <div v-else v-html="correctIconSvg"></div>
              </td>
            </tr>
            <tr>
              <td>
                อัปโหลดเอกสารข้อตกลงเพื่อการหลีกเลี่ยงการโจรกรรมทางวรรณกรรม
              </td>
              <td v-if="isFileStatusValid(student.fileStatus)">
                <div v-if="student.fileStatus.robbery === 0" v-html="wrongIconSvg"></div>
                <div v-else v-html="correctIconSvg"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style></style>
