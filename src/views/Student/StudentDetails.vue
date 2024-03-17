<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount, ref } from 'vue'

import ApiService from '../../composables/apiService'

import Header from '../../components/Header.vue'
import ButtonMain from '../../components/ButtonMain.vue'

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

const hasFileWithId = (filesArray, fileId) => {
  return filesArray.some((file) => file.shortpaperFileTypeId === fileId)
}

onBeforeMount(async () => {
  await getStudent()
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
            <p>
              <span class="font-extrabold">รหัสนักศึกษา:</span>
              {{ student.studentId }}
            </p>
            <p>
              <span class="font-extrabold">ชื่อ:</span> {{ student.firstname }}
            </p>
            <p>
              <span class="font-extrabold">นามสกุล:</span> {{ student.lastname }}
            </p>
            <p><span class="font-extrabold">อีเมล:</span> {{ student.email }}</p>
            <p>
              <span class="font-extrabold">อีเมลสำรอง:</span>
              {{
                student.alternativeEmail !== null ? student.alternativeEmail : '-'
              }}
            </p>
            <p>
              <span class="font-extrabold">เบอร์โทรศัพท์:</span>
              {{ student.phonenumber == null ? '-' : student.phonenumber }}
            </p>
          </div>
        </div>
        <div class="bg-white p-5 rounded-lg">
          <h1 class="text-lg font-black">ข้อมูลโครงงาน</h1>
          <div class="mt-3">
            <p>
              <span class="font-extrabold">ชื่อหัวข้อโครงงาน</span>
              {{ student.shortpaper.shortpaperTopic }}
            </p>
            <p>
              <span class="font-extrabold"
                >วิชาจัดทำ IS Report / Thesis / Project</span
              >
              {{ student.subjects.subjectId }} {{ student.subjects.subjectName }}
            </p>
            <p>
              <span class="font-extrabold"
                >วิชาเลือก Workshop / Thesis / Project</span
              >
              {{ student.subjects.subjectId }} {{ student.subjects.subjectName }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4 text-end">
      <RouterLink :to="`/student/edit?id=${route.query.id}`">
        <ButtonMain text="แก้ไขรายละเอียด" class="bg-bluemain" />
      </RouterLink>
    </div> 
  </div>

  <!-- <div class="mt-5 font-semibold">
     <Header class="text-sm rounded-md" header="ข้อมูลนักศึกษา" /> 

     <div class="mt-4 text-end">
      <RouterLink :to="`/student/edit?id=${route.query.id}`">
        <ButtonMain text="แก้ไขรายละเอียด" />
      </RouterLink>
    </div> 

   <div class="mt-3 justify-center item-center mb-12 grid grid-cols-2 text-sm">
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
                {{ student.phonenumber == null ? '-' : student.phonenumber }}
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
                  student.alternativeEmail !== ""
                    ? student.alternativeEmail
                    : '-'
                }}
              </td>
            </tr>
            <tr>
              <td class="pr-16">ชื่อหัวข้อโครงงาน</td>
              <td>
                {{
                  student.shortpaper == null
                    ? '-'
                    : student.shortpaper.shortpaperTopic
                }}
              </td>
            </tr>

            <tr>
              <td class="pr-16">รายวิชาจัดทำ IS Report</td>
              <td>
                <div v-if="student.subjects">
                  {{ student.subjects.subjectId }}
                  {{ student.subjects.subjectName }}
                </div>
                <div v-else>-</div>
              </td>
            </tr>
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

              <div
                v-if="hasFileWithId(student.shortpaperFiles, 1)"
                v-html="correctIconSvg"
              ></div>
              <div v-else v-html="wrongIconSvg"></div>
            </tr>

            <tr>
              <td>อัปโหลดเอกสารโครงงานครั้งที่ 1</td>

              <div
                v-if="hasFileWithId(student.shortpaperFiles, 2)"
                v-html="correctIconSvg"
              ></div>
              <div v-else v-html="wrongIconSvg"></div>
            </tr>

            <tr>
              <td>อัปโหลดเอกสารโครงงานครั้งที่ 2</td>

              <div
                v-if="hasFileWithId(student.shortpaperFiles, 3)"
                v-html="correctIconSvg"
              ></div>
              <div v-else v-html="wrongIconSvg"></div>
            </tr>

            <tr>
              <td class="pr-16">
                อัปโหลดเอกสารโครงงานในรูปแบบของบทความ
                (ฉบับเกี่ยวข้องกับห้องสมุด)
              </td>

              <div
                v-if="hasFileWithId(student.shortpaperFiles, 4)"
                v-html="correctIconSvg"
              ></div>
              <div v-else v-html="wrongIconSvg"></div>
            </tr>

            <tr>
              <td>อัปโหลดเอกสารโครงงานฉบับสมบูรณ์</td>
              <div
                v-if="hasFileWithId(student.shortpaperFiles, 5)"
                v-html="correctIconSvg"
              ></div>
              <div v-else v-html="wrongIconSvg"></div>
            </tr>

            <tr>
              <td>อัปโหลดใบโอนลิขสิทธิ์</td>

              <div
                v-if="hasFileWithId(student.shortpaperFiles, 6)"
                v-html="correctIconSvg"
              ></div>
              <div v-else v-html="wrongIconSvg"></div>
            </tr>

            <tr>
              <td>
                อัปโหลดเอกสารข้อตกลงเพื่อการหลีกเลี่ยงการโจรกรรมทางวรรณกรรม
              </td>

              <div
                v-if="hasFileWithId(student.shortpaperFiles, 7)"
                v-html="correctIconSvg"
              ></div>
              <div v-else v-html="wrongIconSvg"></div>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div> -->
</template>

<style></style>
