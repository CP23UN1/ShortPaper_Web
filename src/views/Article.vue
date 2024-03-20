<script setup>
import Header from '../components/Header.vue'
</script>

<template>
  <div class="relative overflow-x-auto shadow-md rounded-lg mt-6">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
      <!-- <thead class="text-sm text-white uppercase bg-[#0339A6]"> -->
      <thead class="text-sm text-white uppercase bg-bluemain">
        <tr class="text-center">
          <th scope="col" class="py-4">ลำดับการส่ง</th>
          <th scope="col">หัวข้อ</th>
          <th scope="col">ผู้จัดทำ</th>
          <th scope="col">วิชาที่จัดทำ</th>
          <!-- <th scope="col" class="px-6 py-3"></th> -->
        </tr>
      </thead>
      <tbody class="text-center">
        <tr class="bg-white border-b hover:bg-gray-50 text-gray-900">
          <td class="py-4 font-medium whitespace-nowrap">1</td>
          <td class="font-medium whitespace-nowrap">
            Ethical Considerations in Artificial Intelligence and Machine
            Learning Algorithms
          </td>
          <td class="font-medium whitespace-nowrap">ธิดาพร ช.</td>
          <td class="font-medium whitespace-nowrap">
            INT421 Applied Machine Learning
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style></style>
