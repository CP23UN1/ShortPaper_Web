<script setup>
import { ref } from 'vue'
import ApiService from '../../composables/apiService'
import { useRouter } from 'vue-router'

import Header from '../../components/Header.vue'
import ButtonMain from '../../components/ButtonMain.vue'

const schedule = ref('')
const content = ref('')
const expiredDatetime = ref('')
const imageUrl = ref('')
const router = useRouter()

const createAnnouncement = async () => {
  try {
    const newAnnouncement = {
      Schedule: schedule.value,
      Content: content.value,
      ExpiredDatetime: expiredDatetime.value,
      ImageUrl: imageUrl.value,
    }

    const res = await ApiService.createAnnouncement(newAnnouncement)

    if (res.data.httpStatusCode === 201) {
      alert('บันทึกสำเร็จ')
      router.push('/admin/announcements')
    } else {
    }
  } catch (error) {
    console.error('Error creating announcement:', error)
  }
}
</script>

<template>
  <div>
    <Header class="text-sm rounded-md" header="สร้างประกาศ" />
    <form @submit.prevent="createAnnouncement" class="mt-6 space-y-4">
      <div>
        <label for="schedule" class="block text-sm font-medium text-gray-700"
          >กำหนดการ:</label
        >
        <input
          type="text"
          id="schedule"
          v-model="schedule"
          required
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label for="content" class="block text-sm font-medium text-gray-700"
          >รายการ:</label
        >
        <textarea
          id="content"
          v-model="content"
          required
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></textarea>
      </div>

      <div>
        <label
          for="expiredDatetime"
          class="block text-sm font-medium text-gray-700"
          >วันที่ประกาศหมดอายุ:</label
        >
        <input
          type="datetime-local"
          id="expiredDatetime"
          v-model="expiredDatetime"
          required
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <!-- <div>
        <label for="imageUrl" class="block text-sm font-medium text-gray-700"
          >Image URL:</label
        >
        <input
          type="text"
          id="imageUrl"
          v-model="imageUrl"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div> -->
      <div class="flex justify-end items-end w-full my-5">
        <ButtonMain
          type="submit"
          class="bg-bluemain border hover:bg-white border-bluemain hover:text-bluemain"
          text="สร้างประกาศ"
        />
      </div>
    </form>
  </div>
</template>

<style></style>
