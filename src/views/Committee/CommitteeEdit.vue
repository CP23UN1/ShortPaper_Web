<script setup>
import { onBeforeMount, ref } from 'vue'
import { RouterLink } from 'vue-router'

import ApiService from '../../composables/apiService'
import Header from '../../components/Header.vue'
import SearchInput from '../../components/SearchInput.vue'
import SelectInput from '../../components/SelectInput.vue'
import EmptyData from '../../components/EmptyData.vue'
import ButtonMain from '../../components/ButtonMain.vue'

const shortpapers = ref([])
const subjects = ref([])
const committeeOptions = ref([])
const selectedCommittees = ref({})

const getShortPapers = async () => {
  const res = await ApiService.getShortPapers()

  if (res.status === 200) {
    const data = await res.data
    shortpapers.value = data.data

    // shortpapers.value.forEach(shortpaper => {
    //   selectedCommittees.value[shortpaper.shortpaperId] = ''
    // })
  }
}

const getSubjects = async () => {
  const res = await ApiService.getSubjects()

  if (res.status === 200) {
    const data = await res.data
    subjects.value = data.data
  }
}

const getCommittees = async () => {
  const res = await ApiService.getCommittees()

  if (res.status === 200) {
    const data = await res.data
    committeeOptions.value = data.data
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

onBeforeMount(async () => {
  await getSubjects()
  await getCommittees()
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
              <RouterLink :to="`/student?id=${shortpaper.student.studentId}`">
                <span class="text-bluemain underline">
                  {{ shortpaper.student.studentId }}
                </span>
              </RouterLink>
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

            <!-- <td
              class="px-6 py-4"
              v-for="committee in shortpaper.committees"
              :key="committee.committeeId"
            >
              <select v-model="committee.committeeId">
                <option
                  v-for="com in committeeOptions"
                  :key="com.committeeId"
                  :value="com.committeeId"
                >
                  {{ committee.firstname }} {{ committee.lastname }}
                </option>
              </select>
            </td> -->

          </tr>
        </tbody>
      </table>
    </div>
    <EmptyData v-else class="mt-4" />
  </div>
</template>

<style></style>
