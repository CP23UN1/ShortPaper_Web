
<script setup>
import { onMounted, ref } from 'vue'

import ApiService from '../../composables/apiService'

import Header from '../../components/Header.vue'
import NavbarStudent from '../../components/Navbar/NavbarStudent.vue'
import { RouterLink } from 'vue-router'

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
    <div class="relative">
      <div
        class="bg-cover bg-center bg-no-repeat"
        style="background-image: url('/images/kmutt.png'); height: 300px"
      >
        <NavbarStudent class="mx-14 relative top-[20px]" />
      </div>
    </div>

    <div>
      <h1
        class="text-[#034AA6] font-black text-2xl text-center mt-7 underline underline-offset-8"
      >
        รายการ
      </h1>
      <div class="grid grid-cols-3 mt-7 gap-5 justify-items-center">
        <RouterLink :to="`/student?id=63130500135`">
          <div
            class="shadow-lg p-[64px] rounded-lg hover:bg-bluemain  hover:text-white hover:fill-white"
          >
            <svg
              class="w-[48px] h-[48px] mx-auto"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            <p class="text-center font-black mt-2">ข้อมูลส่วนตัว</p>
          </div></RouterLink
        >

        <RouterLink :to="`/files`">
          <div
            class="shadow-lg p-[64px] rounded-lg hover:bg-bluemain  hover:text-white hover:fill-white"
          >
            <svg
              class="w-[48px] h-[48px] mx-auto"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 3v4a1 1 0 0 1-1 1H5m4 8h6m-6-4h6m4-8v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"
              />
            </svg>

            <p class="text-center font-black mt-2">รายการเอกสาร</p>
          </div></RouterLink
        >

        <RouterLink :to="`/upload`">
          <div
            class="shadow-lg p-[64px] rounded-lg hover:bg-bluemain hover:text-white hover:fill-white"
          >
            <svg
              class="w-[48px] h-[48px] mx-auto"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 10V4a1 1 0 0 0-1-1H9.914a1 1 0 0 0-.707.293L5.293 7.207A1 1 0 0 0 5 7.914V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2M10 3v4a1 1 0 0 1-1 1H5m5 6h9m0 0-2-2m2 2-2 2"
              />
            </svg>

            <p class="text-center font-black mt-2">ส่งเอกสาร</p>
          </div></RouterLink
        >
      </div>
    </div>

    <div class="mt-10 mx-24">
      <div class="bg-bluemain p-12 h-64 rounded-lg">
        <h1 class="font-black text-white text-xl">กำหนดการนักศึกษา</h1>
        <div
          v-for="announcement in announcements"
          :key="announcement.id"
          class="shadow-lg mt-5 p-5 rounded-lg bg-white"
        >
          <h1 class="font-black">{{ announcement.schedule }}</h1>
          <p class="mt-2">{{ announcement.content }}</p>
        </div>
      </div>

      <!-- <div
        class="bg-cover bg-center bg-no-repeat"
        style="background-image: url('/images/kmutt.png'); height: 200px"
      >
        <NavbarStudent class="mx-14 relative top-[20px]" />
      </div> -->
    </div>
  </div>
</template>

<style></style>