<script setup>
import Header from '../components/Header.vue'
</script>

<template>
  <div>
    <div class="mt-5 font-semibold">
      <div class="text-bluemain text-center">
        <p>
          <RouterLink :to="'/files'">
            <span
              class="hover:text-white hover:bg-bluemain hover:p-2 rounded-lg"
              >เอกสารโครงงานทั้งหมด</span
            >
          </RouterLink>
          >
          <span class="font-bold">อัปโหลดเอกสารโครงงาน</span>
        </p>
      </div>
    </div>

    <Header header="อัปโหลดเอกสาร" />
  </div>
</template>

<style></style>
