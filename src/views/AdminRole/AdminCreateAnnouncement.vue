<script setup>
  import { ref } from 'vue'
  import ApiService from '../../composables/apiService'
  
  const schedule = ref('')
  const content = ref('')
  const expiredDatetime = ref('')
  const imageUrl = ref('')
  
  const createAnnouncement = async () => {
    try {
      const newAnnouncement = {
        Schedule: schedule.value,
        Content: content.value,
        ExpiredDatetime: expiredDatetime.value,
        ImageUrl: imageUrl.value
      }
  
      const res = await ApiService.createAnnouncement(newAnnouncement)
  
      if (res.data.httpStatusCode === 201) {
        // Announcement created successfully, you may redirect or show a success message here
      } else {
        // Handle other status codes
      }
    } catch (error) {
      console.error('Error creating announcement:', error)
    }
  }
</script>

<template>
    <div>
      <!-- Header Component -->
      <Header class="text-sm rounded-md" header="Create Announcement" />
  
      <!-- Announcement Form -->
      <form @submit.prevent="createAnnouncement" class="mt-6 space-y-4">
        <div>
          <label for="schedule" class="block text-sm font-medium text-gray-700">Schedule:</label>
          <input type="text" id="schedule" v-model="schedule" required
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
        </div>
  
        <div>
          <label for="content" class="block text-sm font-medium text-gray-700">Content:</label>
          <textarea id="content" v-model="content" required
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
        </div>
  
        <div>
          <label for="expiredDatetime" class="block text-sm font-medium text-gray-700">Expired Datetime:</label>
          <input type="datetime-local" id="expiredDatetime" v-model="expiredDatetime" required
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
        </div>
  
        <div>
          <label for="imageUrl" class="block text-sm font-medium text-gray-700">Image URL:</label>
          <input type="text" id="imageUrl" v-model="imageUrl"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
        </div>
  
        <!-- Submit Button -->
        <button type="submit"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Create Announcement
        </button>
      </form>
    </div>
  </template>
  
<style></style>
  