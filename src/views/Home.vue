<script setup>
import { onMounted, ref } from 'vue'

import ApiService from '../composables/apiService'

import Header from '../components/Header.vue';

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
  <div>
    <!-- <Header class="text-sm rounded-md" header="ประกาศกำหนดการ"/> -->
    <div class="relative overflow-x-auto shadow-md rounded-md mt-5">
      <table class="w-full text-sm text-left rtl:text-right">
        <thead class="text-xs text-white">
          <tr>
            <th scope="col" class="px-6 py-3 w-52 text-center bg-blueheader">กำหนดการ</th>
            <th scope="col" class="px-6 py-3 bg-bluemain text-center">รายการ</th>
            <!-- <th scope="col" class="px-6 py-3">วันที่ประกาศ</th> -->
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-b"
            v-for="announcement in announcements"
            :key="announcement.announcementId"
          >
            <th scope="row" class="px-6 py-4 font-medium">
              {{ announcement.topic }}
            </th>
            <th scope="row" class="px-6 py-4 font-medium">
              {{ announcement.content }}
            </th>
            <th scope="row" class="px-6 py-4 font-medium">
              {{
                announcement.createdDatetimeThai
              }}
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style></style>