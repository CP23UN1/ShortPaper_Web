<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ApiService from '../../composables/apiService'

import Header from '../../components/Header.vue'
import ButtonMain from '../../components/ButtonMain.vue'
import AlertModal from '../../components/Alert/AlertModal.vue'

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
      showAlertModal('บันทึกสำเร็จ', 'success')
      await new Promise(resolve => setTimeout(resolve, 1000))
      await router.push('/admin/announcements')
    } else {
    }
  } catch (error) {
    console.error('Error creating announcement:', error)
  }
}

// Alert Modal
const isAlertModalOpen = ref(false)
const alertMessage = ref('')
const alertStatus = ref('')

const toggleAlertModal = () => {
  isAlertModalOpen.value = !isAlertModalOpen.value
}

const showAlertModal = (message, status) => {
  alertMessage.value = message
  alertStatus.value = status
  isAlertModalOpen.value = true
}
</script>

<template>
  <div>
    <Header class="text-sm rounded-md" header="สร้างประกาศ" />

    <div class="shadow-lg px-6 pb-4 pt-2 rounded-lg">
      <form @submit.prevent="createAnnouncement" class="mt-6 space-y-4">
        <div>
          <label for="schedule" class="block text-sm font-medium"
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
          <label for="content" class="block text-sm font-medium">รายการ:</label>
          <textarea
            id="content"
            v-model="content"
            required
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          ></textarea>
        </div>

        <div>
          <label for="expiredDatetime" class="block text-sm font-medium"
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
        <div class="flex justify-end items-end w-full my-5">
          <ButtonMain
            type="submit"
            class="bg-bluemain border hover:bg-white border-bluemain hover:text-bluemain"
            text="สร้างประกาศ"
          />
        </div>
      </form>
    </div>
  </div>

  <AlertModal
    :alertMessage="alertMessage"
    :is-alert-modal-open="isAlertModalOpen"
    :status="alertStatus"
    @toggle="toggleAlertModal"
  />
</template>

<style></style>
