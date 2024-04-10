<script setup>
import { ref, onBeforeMount } from 'vue'

import Header from '../../components/Header.vue'
import ApiService from '../../composables/apiService'
import SelectInput from '../../components/SelectInput.vue'

const favorites = ref([])

const subjects = ref()
const articles = ref()
const years = ref()

const getArticles = async () => {
  const res = await ApiService.getArticles()
  if (res.status === 200) {
    const data = await res.data
    articles.value = data.data
  }
}

const getSubjects = async () => {
  const subjectsRes = await ApiService.getSubjects()
  if (subjectsRes.status === 200) {
    const subjectsData = await subjectsRes.data
    subjects.value = subjectsData.data
  }
}

const getYearList = async () => {
  const res = await ApiService.getYearList()
  if (res.status === 200) {
    const data = await res.data
    years.value = data.data
  }
}

const addToFavorites = (id) => {
  if (!favorites.value.includes(id)) {
    favorites.value.push(id)
  } else {
    favorites.value = favorites.value.filter((favId) => favId !== id)
  }
}

const isFavorite = (id) => {
  return favorites.value.includes(id)
}

onBeforeMount(async () => {
  await getSubjects()
  await getArticles()
  await getYearList()
})
</script>

<template>
  <div>
    <Header header="เอกสารโครงงานที่ผ่านมา" />

    <div
      class="flex p-4 flex-nowrap space-x-4 justify-center items-center text-sm gap-4"
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
        <!-- <input
          id="search-year"
          type="search"
          class="w-40 h-8 rounded-[4px] border-gray-200 text-sm"
          placeholder="2/2562"
        /> -->
        <select
          name="search-year"
          class="w-40 h-8 rounded-[4px] border-gray-200 text-sm"
        >
          <option v-for="(year, index) in years" :id="index" :value="year">
            {{ year }}
          </option>
        </select>
        <!-- <SelectInput label="ปีการศึกษา" :options="years" placeholder="2/2566" /> -->
      </div>
      <div>
        <button
          class="bg-bluemain text-white w-40 h-8 rounded-md hover:bg-white hover:text-bluemain outline outline-1 hover:outline-bluemain"
        >
          ค้นหา
        </button>
      </div>
    </div>

    <div
      class="relative overflow-x-auto shadow-md rounded-lg mt-6"
      v-if="articles"
    >
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr class="text-center">
            <th scope="col" class="py-3">ลำดับ</th>
            <th scope="col" class="px-6 py-3">หัวข้อ</th>
            <th scope="col" class="py-3">ผู้จัดทำ</th>
            <th scope="col" class="px-6 py-3">วิชาที่จัดทำ</th>
            <th scope="col" class="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody class="">
          <tr
            class="bg-white border-b hover:bg-gray-50 text-gray-900"
            v-for="article in articles"
            :key="article.articleId"
          >
            <td class="py-4 font-medium whitespace-nowrap text-center">
              {{ article.articleId }}
            </td>
            <td class="font-medium whitespace-nowrap">
              {{ article.topic }}
            </td>
            <td class="font-medium whitespace-nowrap text-center">
              {{ article.author }}
            </td>
            <td class="font-medium whitespace-nowrap text-center">
              {{ article.subjects.subjectId }}
              {{ article.subjects.subjectName }}
            </td>
            <td class="font-medium whitespace-nowrap text-center">
              <svg
                @click="addToFavorites(article.articleId)"
                width="18"
                height="18"
                viewBox="0 0 20 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                :class="{ 'text-green-500': isFavorite(article.id) }"
              >
                <path
                  d="M0.666504 24V2.66667C0.666504 1.93333 0.927615 1.30556 1.44984 0.783333C1.97206 0.261111 2.59984 0 3.33317 0H16.6665C17.3998 0 18.0276 0.261111 18.5498 0.783333C19.0721 1.30556 19.3332 1.93333 19.3332 2.66667V24L9.99984 20L0.666504 24Z"
                  fill="#027368"
                />
              </svg>
            </td>
            <!-- <td class="font-medium whitespace-nowrap">
              <RouterLink :to="`/file/${fileType.typeId}/${shortpaperId}`">
                
                <span class="text-bluemain underline hover:no-underline"
                  >รายละเอียด</span
                >
              </RouterLink>
            </td> -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style></style>
