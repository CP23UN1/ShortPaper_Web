<script setup>
import { ref } from 'vue'
import Header from '../components/Header.vue'
import FileInput from '../components/FileInput.vue'
import RadioButton from '../components/RadioButton.vue'
import ButtonMain from '../components/ButtonMain.vue'

const link = ref()
const sendFile = () => {
  console.log(link.value)
}
</script>

<template>
  <div>
    <div class="mt-5 font-semibold">
      <div class="text-bluemain text-left text-sm">
        <p>
          <RouterLink :to="'/files'">
            <span
              class="hover:text-blueheader"
              >เอกสารโครงงานทั้งหมด</span
            >
          </RouterLink>
          >
          <span class="font-bold text-sm">อัปโหลดเอกสารโครงงาน</span>
        </p>
      </div>
    </div>

    <Header class="text-sm rounded-md" header="อัปโหลดเอกสาร" />

    <div class="relative overflow-x-auto shadow-md rounded-lg text-center">
      <div class="m-8">
        <FileInput
          label="อัปโหลดเอกสาร: "
          describe="*** เอกสารแต่งตั้งคณะกรรมการสำหรับ Upload จะต้องเป็นไฟล์ .PDF เท่านั้น ***"
        />
        <div class="grid grid-cols-3 mt-12 ml-16 text-sm">
          <RadioButton
            name="filetype"
            id="bOne"
            value="bOne"
            label="ใบ บ.1"
            isChecked="true"
          />
          <RadioButton
            name="filetype"
            id="paperOne"
            value="paperOne"
            label="เอกสารโครงงานครั้งที่ 1"
          />
          <RadioButton
            name="filetype"
            id="paperTwo"
            value="paperTwo"
            label="เอกสารโครงงานครั้งที่ 2"
          />
          <RadioButton
            name="filetype"
            id="article"
            value="article"
            label="รูปเล่มบทความ"
          />
          <RadioButton
            name="filetype"
            id="copyright"
            value="copyright"
            label="ใบโอนลิขสิทธิ์"
          />
          <RadioButton
            name="filetype"
            id="plagiarism"
            value="plagiarism"
            label="ใบโจรกรรม"
          />
          <RadioButton
            name="filetype"
            id="final"
            value="final"
            label="ฉบับสมบูรณ์"
          />
        </div>
        <form>
          <label for="input">วิดีโอคำอธิบายเพิ่มเติม</label>
          <div class="relative">
            <input
              type="text"
              id="input"
              class="inline-flex w-72 py-2 mt-2  border border-gray-300 rounded-lg bg-gray-50 focus:ring-bluemain focus:border-bluemain"
              placeholder="กรุณาแนบลิงก์"
              v-model="link"
            />
            <ButtonMain text="บันทึก" @click="sendFile" class="ml-3" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style></style>
