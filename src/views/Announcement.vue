<script setup>
import ApiService from '../composables/apiService'
import { onMounted, ref } from 'vue'

const announcements = ref([])

onMounted(async () => {
  const announcementResponse = await ApiService.getAnnouncement()
  announcements.value = announcementResponse.data
})
</script>

<template>
  <div v-for="announcement in announcements" :key="announcement.id">
    <h1>
      <b>{{ announcement.title }}</b>
    </h1>
    <p>{{ announcement.content }}</p>
  </div>
</template>

<style></style>
