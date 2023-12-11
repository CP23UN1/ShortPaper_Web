<script setup>
import { onBeforeMount, ref } from 'vue'
import ApiService from '../../composables/apiService'

const projects = ref({})

const getProjects = async () => {
  const res = await ApiService.getProjects()

  if (res.status === 200) {
    const data = await res.data
    projects.value = data
  }
}

onBeforeMount(async () => {
  await getProjects()
})
</script>

<template>
  <div>
    <div class="bg-bluemain text-white p-4 mb-3 text-lg mt-5">
      <h1>คณะกรรมการ</h1>
    </div>

    <div
      class="w-full bg-white shadow-md mt-[24px] py-[8px] px-[16px flex justify-center"
    >
      <div>
        <input
          type="text"
          class="justify-items-center border-slate-200 mr-[32px] text-opacity-60 text-sm font-medium text-slate-500 w-[500px]"
          placeholder="Upload File .CSV"
        />
        <p class="text-red-500 text-xs italic">
          *** เอกสารแต่งตั้งคณะกรรมการสำหรับ Upload จะต้องเป็นไฟล์ .CSV เท่านั้น
          ***
        </p>
        <div></div>
      </div>
      <button
        class="bg-bluebtn p-[20px] text-white hover:bg-white fill-white hover:text-bluemain hover:fill-bluemain rounded-sm text-sm font-medium flex justify-evenly items-center shadow-md"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 28 28"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.3807 16.6312H17.459L17.1324 16.3162C18.2757 14.9862 18.964 13.2595 18.964 11.3812C18.964 7.19285 15.569 3.79785 11.3807 3.79785C7.19236 3.79785 3.79736 7.19285 3.79736 11.3812C3.79736 15.5695 7.19236 18.9645 11.3807 18.9645C13.259 18.9645 14.9857 18.2762 16.3157 17.1329L16.6307 17.4595V18.3812L22.464 24.2029L24.2024 22.4645L18.3807 16.6312ZM11.3807 16.6312C8.4757 16.6312 6.1307 14.2862 6.1307 11.3812C6.1307 8.47618 8.4757 6.13118 11.3807 6.13118C14.2857 6.13118 16.6307 8.47618 16.6307 11.3812C16.6307 14.2862 14.2857 16.6312 11.3807 16.6312Z"
          />
        </svg>
        ค้นหา
      </button>
    </div>

    <div class="mt-[24px] flex justify-center">
      <table
        class="text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400 rounded-md w-full"
      >
        <thead
          class="text-xs text-white uppercase bg-bluemain dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">รหัสนักศึกษา</th>
            <th scope="col" class="px-6 py-3">กรรมการคนที่ 1</th>
            <th scope="col" class="px-6 py-3">กรรมการคนที่ 2</th>
            <th scope="col" class="px-6 py-3">กรรมการคนที่ 3</th>
          </tr>
        </thead>
        <tbody class="bg-slate-200">
          <tr
            class="px-6 py-3"
            v-for="project in projects"
            :key="project.projectId"
          >
            <td>{{ project.student.studentId }}</td>
            <td>
              {{
                project.committeeFirst != null
                  ? project.committeeFirst.firstname
                  : '-'
              }}
              {{
                project.committeeFirst != null
                  ? project.committeeFirst.lastname
                  : ''
              }}
            </td>
            <td>
              {{
                project.committeeSecond != null
                  ? project.committeeSecond.firstname
                  : '-'
              }}
              {{
                project.committeeSecond != null
                  ? project.committeeSecond.lastname
                  : ''
              }}
            </td>
            <td>
              {{
                project.committeeThird != null
                  ? project.committeeThird.firstname
                  : '-'
              }}
              {{
                project.committeeThird != null
                  ? project.committeeThird.firstname
                  : ''
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style></style>
