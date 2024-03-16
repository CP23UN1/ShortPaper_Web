<script setup>
import { onMounted, ref } from 'vue'

import ApiService from '../../composables/apiService'

import Header from '../../components/Header.vue'
import NavbarStudent from '../../components/Navbar/NavbarStudent.vue'

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
  <div class="relative">
    <div>
      <div
        class="bg-cover bg-center bg-no-repeat"
        style="background-image: url('/images/kmutt.png'); height: 200px"
      >
        <NavbarStudent class="mx-14 relative top-[20px]" />
      </div>
    </div>
  </div>
</template>

<style>

</style>
