<script setup>
import { ref, onMounted } from 'vue'

import ApiService from '../../composables/apiService'

import ButtonMain from '../../components/ButtonMain.vue'
import Header from '../../components/Header.vue'

const uploadIconSvg = `<svg class="w-[20px] h-[20px] text-bluemain hover:text-red-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 19">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15h.01M4 12H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-3m-5.5 0V1.07M5.5 5l4-4 4 4"/>
  </svg>`

const downloadIconSvg = `<svg class="w-[20px] h-[20px] text-bluemain hover:text-red-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 19">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15h.01M4 12H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-3M9.5 1v10.93m4-3.93-4 4-4-4"/>
  </svg>`

const doneIconSvg = `<svg class="w-[20px] h-[20px] text-teal-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
  </svg>`

const files = ref()

const getFiles = async () => {
  const res = await ApiService.getFiles()

  if (res.status === 200) {
    const data = await res.data
    files.value = data.data
  }
}

onMounted(async () => {
  await getFiles()
})
</script>

<template>
  <div>
    <div class="mt-5 font-semibold">
      <div class="text-bluemain text-left text-sm">
        <p>
          <RouterLink :to="'/files'">
            <span class="hover:text-blueheader">เอกสารโครงงาน</span>
          </RouterLink>
        </p>
      </div>
    </div>
    <Header class="text-sm rounded-md" header="เอกสารโครงงาน" />
    <div class="relative overflow-x-auto shadow-md rounded-lg mt-6">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr class="text-center">
            <th scope="col" class="px-6 py-3">ลำดับการส่ง</th>
            <th scope="col" class="px-6 py-3">กำหนดการ</th>
            <th scope="col" class="px-6 py-3">วันที่ส่ง</th>
            <th scope="col" class="px-6 py-3">รายการ</th>
            <th scope="col" class="px-6 py-3">อัปโหลด</th>
            <th scope="col" class="px-6 py-3">ดาวน์โหลด</th>
            <th scope="col" class="px-6 py-3 sr-only">รายละเอียด</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr
            class="bg-white border-b hover:bg-gray-50 text-gray-900"
            v-for="file in files"
            :key="file.shortpaperFileId"
          >
            <td class="px-6 py-4 font-medium whitespace-nowrap">
              {{ file.shortpaperFileId }}
            </td>
            <td class="px-6 py-4 font-medium whitespace-nowrap">
              announcement schedule
            </td>
            <td class="px-6 py-4 font-medium whitespace-nowrap">
              {{ new Date(file.updatedDatetime).toLocaleDateString() }}
            </td>
            <td class="px-6 py-4 font-medium whitespace-nowrap">
              {{ file.shortpaperFileType.typeName }}
            </td>
            <td class="px-6 py-4 font-medium whitespace-nowrap">
              <RouterLink :to="`/upload`">
                <div
                  class="flex justify-center items-center"
                  v-html="uploadIconSvg"
                ></div>
              </RouterLink>
              <!-- <div v-html="doneIconSvg"></div>  -->
            </td>
            <td
              class="px-6 py-4 font-medium whitespace-nowrap flex justify-center items-center"
            >
              <div v-html="downloadIconSvg"></div>
            </td>
            <td class="px-6 py-4 font-medium whitespace-nowrap">
              <RouterLink :to="`/filedetails`">
                <ButtonMain text="รายละเอียด" />
              </RouterLink>
            </td>
          </tr>
          <!-- <tr class="bg-white border-b hover:bg-gray-50 text-gray-900">
            <td class="px-6 py-4 font-medium whitespace-nowrap">1</td>
            <td class="px-6 py-4 font-medium whitespace-nowrap">
              25 ธันวาคม 2566
            </td>
            <td class="px-6 py-4 font-medium whitespace-nowrap">
              23 ธันวาคม 2566
            </td>
            <td class="px-6 py-4 font-medium whitespace-nowrap">ใบ บ.1</td>
            <td class="px-6 py-4 font-medium whitespace-nowrap">
              <RouterLink :to="`/upload`">
                <div
                  class="flex justify-center items-center"
                  v-html="uploadIconSvg"
                ></div>
              </RouterLink>
             <div v-html="doneIconSvg"></div> 
            </td>
            <td
              class="px-6 py-4 font-medium whitespace-nowrap flex justify-center items-center"
            >
              <div v-html="downloadIconSvg"></div>
            </td>
            <td class="px-6 py-4 font-medium whitespace-nowrap">
              <RouterLink :to="`/filedetails`"> 
              <ButtonMain text="รายละเอียด" />
             </RouterLink> 
            </td>
          </tr> 
          <tr class="bg-white border-b hover:bg-gray-50 text-gray-900">
            <td class="px-6 py-4 font-medium whitespace-nowrap">2</td>
            <td class="px-6 py-4 font-medium whitespace-nowrap">
              28 ธันวาคม 2566
            </td>
            <td class="px-6 py-4 font-medium whitespace-nowrap">
              25 ธันวาคม 2566
            </td>
            <td class="px-6 py-4 font-medium whitespace-nowrap">ใบ บ.2</td>
            <td
              class="px-6 py-4 font-medium whitespace-nowrap flex justify-center items-center"
            >
              <RouterLink :to="`/upload`">
                <div v-html="uploadIconSvg"></div>
              </RouterLink>
              <div v-html="doneIconSvg"></div>
            </td>
            <td class="font-medium whitespace-nowrap">
              <div
                class="flex justify-center items-center"
                v-html="downloadIconSvg"
              ></div>
            </td>
            <td class="px-6 py-4 font-medium whitespace-nowrap">
            <RouterLink :to="`/filedetails`"> 
              <ButtonMain text="รายละเอียด" />
              </RouterLink>
            </td>
          </tr> -->
        </tbody>
      </table>
    </div>
  </div>
</template>

<style></style>
