<script>
import { ref, onMounted } from 'vue'

// import ApiService from '../../composables/apiService'

// import ButtonMain from '../../components/ButtonMain.vue'
import Header from '../components/Header.vue'</script>
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
        <Header header="เอกสารโครงงานที่ผ่านมา"/>
        <div class="relative overflow-x-auto shadow-md rounded-lg mt-6">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr class="text-center">
                        <th scope="col" class="px-6 py-3">ลำดับการส่ง</th>
                        <th scope="col" class="px-6 py-3">กำหนดการ</th>
                        <th scope="col" class="px-6 py-3">วันที่ส่ง</th>
                        <th scope="col" class="px-6 py-3">รายการ</th>
                        <!-- <th scope="col" class="px-6 py-3">อัปโหลด</th> -->
                        <th scope="col" class="px-6 py-3">ดาวน์โหลด</th>
                        <th scope="col" class="px-6 py-3 sr-only">รายละเอียด</th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    <tr class="bg-white border-b hover:bg-gray-50 text-gray-900" v-for="file in files"
                        :key="file.shortpaperFileId">
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
                                <div class="flex justify-center items-center" v-html="uploadIconSvg"></div>
                            </RouterLink>
                            <!-- <div v-html="doneIconSvg"></div>  -->
                        </td>
                        <td class="px-6 py-4 font-medium whitespace-nowrap flex justify-center items-center">
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