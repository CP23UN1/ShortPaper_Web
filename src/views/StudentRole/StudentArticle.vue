<script setup>
import Header from '../../components/Header.vue'
</script>

<template>
  <Header class="text-sm rounded-md" header="เอกสารโครงงานที่ผ่านมา" />
  <div
    class="flex flex-nowrap space-x-4 p-4 mt-[12px] justify-center items-center"
  >
    <div>ค้นหาชื่อหัวข้อ หรือผู้จัดทำ</div>
    <input type="search" class="w-80 h-8 rounded-[4px] border-gray-200" />
    <div>ค้นหาวิชาที่จัดทำ</div>
    <input type="search" class="w-40 h-8 rounded-[4px] border-gray-200" />
    <div>ปีการศึกษา</div>
    <input type="search" class="w-40 h-8 rounded-[4px] border-gray-200" />
    <button
      class="bg-bluemain text-white w-40 h-8 rounded-md hover:bg-[#034AA6] hover:text-white shadow-sm"
    >
      ค้นหา
    </button>
  </div>
  <div class="relative overflow-x-auto shadow-md rounded-lg mt-[12px]">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead class="text-sm text-white uppercase bg-bluemain">
        <tr class="text-center">
          <th scope="col" class="py-4">ลำดับการส่ง</th>
          <th scope="col">หัวข้อ</th>
          <th scope="col">ผู้จัดทำ</th>
          <th scope="col">วิชาที่จัดทำ</th>
          <th scope="col" class="px-6 py-3"></th>
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
          <td class="font-medium whitespace-nowrap">
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.666504 24V2.66667C0.666504 1.93333 0.927615 1.30556 1.44984 0.783333C1.97206 0.261111 2.59984 0 3.33317 0H16.6665C17.3998 0 18.0276 0.261111 18.5498 0.783333C19.0721 1.30556 19.3332 1.93333 19.3332 2.66667V24L9.99984 20L0.666504 24Z"
                fill="#027368"
              />
            </svg>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style></style>
