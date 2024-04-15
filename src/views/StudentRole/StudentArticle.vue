<script setup>
import { ref, onBeforeMount } from 'vue'
import { useAuthStore } from '../../stores/auth'
import ApiService from '../../composables/apiService'
import Header from '../../components/Header.vue'
import EmptyData from '../../components/EmptyData.vue'

const subjects = ref([])
const articles = ref([])
const years = ref([])
const favoriteArticles = ref([])

const store = useAuthStore()
const studentId = ref(store.userId)

const bookmarkIcon = `<svg class="w-[24px] h-[24px] text-correct cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 21-5-4-5 4V3.889a.92.92 0 0 1 .244-.629.808.808 0 0 1 .59-.26h8.333a.81.81 0 0 1 .589.26.92.92 0 0 1 .244.63V21Z"/>
</svg>`
const bookmarkedIcon = `<svg class="w-[24px] h-[24px] text-correct cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path d="M7.833 2c-.507 0-.98.216-1.318.576A1.92 1.92 0 0 0 6 3.89V21a1 1 0 0 0 1.625.78L12 18.28l4.375 3.5A1 1 0 0 0 18 21V3.889c0-.481-.178-.954-.515-1.313A1.808 1.808 0 0 0 16.167 2H7.833Z"/>
</svg>`

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

const getArticles = async () => {
  const res = await ApiService.getArticles()
  if (res.status === 200) {
    const data = await res.data
    articles.value = data.data
  }
}

const getFavoriteArticles = async () => {
  try {
    const res = await ApiService.getFavoriteArticles(studentId.value)
    if (res.status === 200) {
      favoriteArticles.value = res.data.data.map((article) => article.articleId)
    }
  } catch (error) {
    console.error('Error fetching favorite articles:', error)
  }
}

const addToFavorites = async (articleId) => {
  try {
    const isAlreadyFavorite = isFavorite(articleId)
    const res = isAlreadyFavorite
      ? await ApiService.removeFromFavorites(studentId.value, articleId)
      : await ApiService.addToFavorites(studentId.value, articleId)

    if (res.status === 200) {
      alert(isAlreadyFavorite ? 'Removed from favorites' : 'Added to favorites')
      await getFavoriteArticles()
    } else {
      console.error('Failed to add/remove from favorites:', res.status)
    }
  } catch (error) {
    console.error('Error adding/removing from favorites:', error)
  }
}

const isFavorite = (articleId) => {
  return favoriteArticles.value.includes(articleId)
}

const toggleFavorite = async (articleId) => {
  await addToFavorites(articleId)
}

const getBookmarkIcon = (articleId) => {
  return isFavorite(articleId) ? bookmarkedIcon : bookmarkIcon
}

const topicKeyword = ref(null)
const subjectKeyword = ref(null)
const yearKeyword = ref(null)

const filterArticle = async () => {
  console.log(topicKeyword.value)
  console.log(yearKeyword.value)
  console.log(subjectKeyword.value)
  if (
    topicKeyword.value == null &&
    subjectKeyword.value == null &&
    yearKeyword.value == null
  ) {
    await getArticles()
  } else {
    const keyword = {
      topicOrAuthor: topicKeyword.value,
      year: yearKeyword.value,
      subject: subjectKeyword.value,
    }
    const res = await ApiService.filterArticle(keyword)
    if (res.status === 200) {
      const data = await res.data
      articles.value = data.data
    }
  }
}

onBeforeMount(async () => {
  await getSubjects()
  await getArticles()
  await getYearList()
  await getFavoriteArticles()
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
          v-model="topicKeyword"
        />
      </div>
      <div class="flex items-center">
        <label class="mr-2" for="search-subject">ค้นหาวิชาที่จัดทำ</label>
        <select
          id="search-subject"
          class="w-40 h-8 rounded-[4px] border-gray-200 text-sm"
          v-model="subjectKeyword"
        >
          <option :value="null">ไม่ได้เลือกวิชา</option>
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
        <select
          name="search-year"
          class="w-40 h-8 rounded-[4px] border-gray-200 text-sm"
          v-model="yearKeyword"
        >
          <option :value="null">ไม่ได้เลือกปีการศึกษา</option>
          <option v-for="(year, index) in years" :id="index" :value="year">
            {{ year }}
          </option>
        </select>
      </div>
      <div>
        <button
          class="bg-bluemain text-white w-40 h-8 rounded-md hover:bg-white hover:text-bluemain outline outline-1 hover:outline-bluemain"
          @click="filterArticle"
        >
          ค้นหา
        </button>
      </div>
    </div>

    <div
      class="relative overflow-x-auto shadow-md rounded-lg mt-6"
      v-if="articles.length > 0"
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
            <td class="font-medium whitespace-nowrap">{{ article.topic }}</td>
            <td class="font-medium whitespace-nowrap text-center">
              {{ article.author }}
            </td>
            <td class="font-medium whitespace-nowrap text-center">
              {{ article.subjects.subjectId }}
              {{ article.subjects.subjectName }}
            </td>
            <td class="font-medium whitespace-nowrap text-center">
              <div
                @click="toggleFavorite(article.articleId)"
                v-html="getBookmarkIcon(article.articleId)"
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <EmptyData message="ไม่มีข้อมูลเอกสาร" />
    </div>
  </div>
</template>

<style></style>
