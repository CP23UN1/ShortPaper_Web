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
    <Header header="ประกาศกำหนดการ" />
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
      <table class="w-full text-sm text-left rtl:text-right">
        <thead class="text-xs text-white bg-blueheader">
          <tr>
            <th scope="col" class="px-6 py-3">กำหนดการ</th>
            <th scope="col" class="px-6 py-3">รายการ</th>
            <th scope="col" class="px-6 py-3">วันที่ประกาศ</th>
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
                new Date(announcement.createdDatetime).toLocaleDateString(
                  'th-TH',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }
                )
              }}
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style></style>