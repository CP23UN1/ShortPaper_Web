<script setup>
import { onBeforeMount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import ApiService from '../../composables/apiService'
import Header from '../../components/Header.vue'
import SearchInput from '../../components/SearchInput.vue'
import SelectInput from '../../components/SelectInput.vue'
import EmptyData from '../../components/EmptyData.vue'
import ButtonMain from '../../components/ButtonMain.vue'

const shortpapers = ref([])
const subjects = ref([])

const getShortPapers = async () => {
  const res = await ApiService.getShortPapers()

  if (res.status === 200) {
    const data = await res.data
    shortpapers.value = data.data
  }
}

const getSubjects = async () => {
  const res = await ApiService.getSubjects()

  if (res.status === 200) {
    const data = await res.data
    subjects.value = data.data
  }
}

const searchShortPapers = async (keyword) => {
  if (!keyword) {
    await getShortPapers()
  } else {
    const res = await ApiService.searchShortPapers(keyword)
    if (res.status === 200) {
      const data = await res.data
      shortpapers.value = data.data
    }
  }
}

const years = ['1/2565', '2/2565', '1/2566', '2/2566']

onBeforeMount(async () => {
  await getSubjects()
  await searchShortPapers()
})
</script>

<template>
  <div class="mt-5 font-semibold">
    <div class="text-bluemain text-left text-sm">
      <p>
        <RouterLink :to="'/committees'">
          <span class="hover:text-blueheader">คณะกรรมการ</span>
        </RouterLink>
      </p>
    </div>
  </div>
  <div class="text-sm">
    <Header class="text-sm rounded-md" header="คณะกรรมการ" />

    <!-- Excel -->
    <!-- <div
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
    </div> -->

    <div class="p-4 shadow-md">
      <SearchInput
        label="ค้นหานักศึกษา"
        placeholder="กรอกรหัสนักศึกษา รหัสวิชา หรือปีการศึกษา"
        @searchKeyword="searchShortPapers"
      />
      <!-- <div class="grid grid-cols-2 gap-10 items-center mt-2">
        <div>
          <label for="selectKeyword" class="block font-medium text-gray-900"
            >รหัสวิชา
          </label>
          <select
            id="selectKeyword"
            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option
              selected
              v-for="subject in subjects"
              :key="subject.subjectId"
            >
              {{ subject.subjectId }} {{ subject.subjectName }}
            </option>
          </select>
        </div>
        <SelectInput :options="years" label="ปีการศึกษา" />
      </div> -->
    </div>

    <div
      class="relative overflow-x-auto shadow-md rounded-lg mt-6"
      v-if="shortpapers.length !== 0"
    >
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">ลำดับ</th>
            <th scope="col" class="px-6 py-3">ชื่อ - นามสกุล</th>
            <th scope="col" class="px-6 py-3">รหัสนักศึกษา</th>
            <th scope="col" class="px-6 py-3">รหัสวิชา</th>
            <th scope="col" class="px-6 py-3">ประธาน</th>
            <th scope="col" class="px-6 py-3">ที่ปรึกษา</th>
            <th scope="col" class="px-6 py-3">กรรมการ</th>
            <th scope="col" class="px-6 py-3 sr-only">รายละเอียด</th>
          </tr>
        </thead>

        <tbody>
          <tr
            class="bg-white border-b hover:bg-gray-50"
            v-for="(shortpaper, index) in shortpapers"
            :key="shortpaper.shortpaperId"
          >
            <td
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {{ index + 1 }}
            </td>
            <td
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {{ shortpaper.student.studentId }}
            </td>
            <td
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {{ shortpaper.student.firstname }}
              {{ shortpaper.student.lastname }}
            </td>
            <td
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {{ shortpaper.subjects.subjectId }}
            </td>

            <td
              class="px-6 py-4"
              :class="
                !shortpaper.committees ||
                !shortpaper.committees.some(
                  (committee) => committee.isPrincipal
                )
                  ? 'text-center'
                  : ''
              "
            >
              <span
                v-if="
                  !shortpaper.committees ||
                  !shortpaper.committees.some(
                    (committee) => committee.isPrincipal
                  )
                "
              >
                -
              </span>
              <span v-else>
                <span
                  v-for="committee in shortpaper.committees"
                  :key="committee.committeeId"
                >
                  <span v-if="committee.isPrincipal">
                    {{ committee.firstname }} {{ committee.lastname }}
                  </span>
                </span>
              </span>
            </td>

            <td
              class="px-6 py-4"
              :class="
                !shortpaper.committees ||
                !shortpaper.committees.some((committee) => committee.isAdvisor)
                  ? 'text-center'
                  : ''
              "
            >
              <span
                v-if="
                  !shortpaper.committees ||
                  !shortpaper.committees.some(
                    (committee) => committee.isAdvisor
                  )
                "
              >
                -
              </span>
              <span v-else>
                <span
                  v-for="committee in shortpaper.committees"
                  :key="committee.committeeId"
                >
                  <span v-if="committee.isAdvisor">
                    {{ committee.firstname }} {{ committee.lastname }}
                  </span>
                </span>
              </span>
            </td>

            <td
              class="px-6 py-4"
              :class="
                !shortpaper.committees ||
                !shortpaper.committees.some(
                  (committee) => committee.isCommittee
                )
                  ? 'text-center'
                  : ''
              "
            >
              <span
                v-if="
                  !shortpaper.committees ||
                  !shortpaper.committees.some(
                    (committee) => committee.isCommittee
                  )
                "
              >
                -
              </span>
              <span v-else>
                <span
                  v-for="committee in shortpaper.committees"
                  :key="committee.committeeId"
                >
                  <span v-if="committee.isCommittee">
                    {{ committee.firstname }} {{ committee.lastname }}
                  </span>
                </span>
              </span>
            </td>

            <td
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              <RouterLink :to="`/student?id=${shortpaper.student.studentId}`">
                <ButtonMain text="รายละเอียด" />
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <EmptyData v-else class="mt-4" />
  </div>
</template>

<style></style>
