<script setup>
import { onMounted, ref } from 'vue'

import ApiService from '../composables/apiService'

import Header from '../components/Header.vue'

const announcements = ref([])

const getAnnouncements = async () => {
  const res = await ApiService.getAnnouncements()

  if (res.data.httpStatusCode === 200) {
    const data = await res.data.data
    announcements.value = data
  }
}

onMounted(async () => {
  await getAnnouncements()
})
</script>
<template>
  <div class="flex justify-center h-screen">
    <div class="w-full lg:w-3/4">
      <!-- <Header class="text-sm rounded-md" header="ประกาศกำหนดการ"/> -->
      <div class="relative overflow-x-auto rounded-md mt-5">
        <table class="text-sm text-left rtl:text-right mx-auto w-full">

          <thead class="text-white text-center">
            <tr>
              <th scope="col" class="p-4  bg-blueheader rounded-l-md">
                กำหนดการ
              </th>
              <th scope="col" class="p-4 bg-bluemain">รายการ</th>
              <th scope="col" class="p-4 bg-bluemain text-center rounded-r-md">
                วันที่ประกาศ
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b" v-for="announcement in announcements" :key="announcement.announcementId">
              <th scope="row" class="p-4 w-52 font-medium text-center">
                {{ announcement.schedule }}
              </th>
              <th scope="row" class="p-4 font-medium w-72">
                {{ announcement.content }}
              </th>
              <th scope="row" class="p-4 font-medium w-72 text-center">
                {{ announcement.createdDatetimeThai }}
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- <div class="bg-bluemain p-4 m-2 rounded-md text-white flex">
        <div>ข่าวและกิจกรรม</div>
        <p class="ml-auto underline">See All</p>
      </div>
      <div class="flex justify-center items-center">
        <div class="grid grid-cols-3">
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<style></style>
