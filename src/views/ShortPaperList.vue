<script>
import { ref, onMounted } from 'vue'
import Header from '../components/Header.vue'

const downloadIconSvg = `<svg class="w-[20px] h-[20px] text-bluemain hover:text-correct cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 19">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15h.01M4 12H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-3M9.5 1v10.93m4-3.93-4 4-4-4"/>
  </svg>`
  
</script>

<template>
  <div>
    <div class="mt-5 font-semibold">
      <div class="text-bluemain text-left text-sm">
        <p>
          <RouterLink :to="'/history'">
            <span class="hover:text-blueheader">เอกสารโครงงานที่ผ่านมา</span>
          </RouterLink>
        </p>
      </div>
    </div>
    <Header header="เอกสารโครงงานที่ผ่านมา" />
    <div class="relative overflow-x-auto shadow-md rounded-lg mt-6">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr class="text-center">
            <th scope="col" class="py-3">ลำดับ</th>
            <th scope="col" class="px-6 py-3">รายการ</th>
            <th scope="col" class="py-3">ดาวน์โหลด</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr class="bg-white border-b hover:bg-gray-50 text-gray-900">
            <td class="py-4 font-medium whitespace-nowrap">1</td>
            <td class="font-medium whitespace-nowrap">name</td>
            <td class="font-medium whitespace-nowrap">
              <div
                class="flex justify-center items-center"
                v-html="downloadIconSvg"
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
