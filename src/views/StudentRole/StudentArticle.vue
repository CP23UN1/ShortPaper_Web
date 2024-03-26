<script setup>
import { ref, onBeforeMount } from 'vue'

import Header from '../../components/Header.vue'
import ApiService from '../../composables/apiService'

const subjects = ref()

const getSubjects = async () => {
  const subjectsRes = await ApiService.getSubjects()
  if (subjectsRes.status === 200) {
    const subjectsData = await subjectsRes.data
    subjects.value = subjectsData.data
  }
}

onBeforeMount(async () => {
  await getSubjects()
})
</script>

<template>
  <div>
    <Header class="text-sm rounded-md" header="เอกสารโครงงานที่ผ่านมา" />

    <div
      class="flex flex-nowrap space-x-4 p-4 justify-center items-center text-sm"
    >
      <div class="flex items-center">
        <label for="search-topic" class="mr-2"
          >ค้นหาชื่อหัวข้อ หรือผู้จัดทำ</label
        >
        <input
          id="search-topic"
          type="search"
          class="w-80 h-8 rounded-[4px] border-gray-200 text-sm"
          placeholder="ค้นหาชื่อหัวข้อ หรือผู้จัดทำ"
        />
      </div>
      <div class="flex items-center">
        <label class="mr-2" for="search-subject">ค้นหาวิชาที่จัดทำ</label>
        <select
          id="earch-subject"
          class="w-40 h-8 rounded-[4px] border-gray-200 text-sm"
        >
          <option>ยังไม่ได้เลือกวิชา</option>
          <option
            v-for="subject in subjects"
            :key="subject.subjectId"
            :value="subject.subjectId"
          >
            {{ subject.subjectId }} {{ subject.subjectName }}
          </option>
        </select>
      </div>
      <div class="flex items-center">
        <label for="search-year" class="mr-2">ปีการศึกษา</label>
        <input
          id="search-year"
          type="search"
          class="w-40 h-8 rounded-[4px] border-gray-200 text-sm"
          placeholder="2/2562"
        />
      </div>
      <div>
        <button
          class="bg-bluemain text-white w-40 h-8 rounded-md hover:bg-white hover:text-bluemain outline outline-1 hover:outline-bluemain"
        >
          ค้นหา
        </button>
      </div>
    </div>

    <div class="relative overflow-x-auto shadow-md rounded-lg mt-[12px]">
      <table class="w-full text-sm text-gray-500">
        <thead class="text-sm text-white uppercase bg-bluemain">
          <tr>
            <th scope="col" class="py-2 px-6 text-left">ลำดับการส่ง</th>
            <th scope="col" class="px-6 text-left">หัวข้อ</th>
            <th scope="col" class="px-6 text-left">ผู้จัดทำ</th>
            <th scope="col" class="px-6 text-left">วิชาที่จัดทำ</th>
            <th scope="col" class="px-6"></th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b hover:bg-gray-50 text-gray-900">
            <td class="py-3 px-6 font-medium">1</td>
            <td class="py-3 px-6 font-medium">
              Ethical Considerations in Artificial Intelligence and Machine
              Learning Algorithms
            </td>
            <td class="py-3 px-6 font-medium">ธิดาพร ช.</td>
            <td class="py-3 px-6 font-medium">
              INT421 Applied Machine Learning
            </td>
            <td class="py-3 px-6">
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.666504 24V2.66667C0.666504 1.93333 0.927615 1.30556 1.44984 0.783333C1.97206 0.261111 2.59984 0 3.33317 0H16.6665C17.3998 0 18.0276 0.261111 18.5498 0.783333C19.0721 1.30556 19.3332 1.93333 19.3332 2.66667V24L9.99984 20L0.666504 24Z"
                  fill="#027368"
                />
              </svg>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style></style>
