<script setup>
import { onMounted, ref, computed, watch, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

import ApiService from '../../composables/apiService'

import Header from '../../components/Header.vue'
import FileInput from '../../components/FileInput.vue'
import RadioButton from '../../components/RadioButton.vue'
import ButtonMain from '../../components/ButtonMain.vue'
import AlertModal from '../../components/Alert/AlertModal.vue'

const route = useRoute()
const router = useRouter()
const store = useAuthStore()
const studentId = ref(store.userId)

const typeId = ref(route.params.typeId)

const shortpaper = ref()
const shortpaperId = ref()

const fileTypes = ref([])
const committees = ref([])
const selectedRole = ref('')

const file = ref(null)
const explanationVideo = ref('')
const remark = ref('')

const selectedCommittee = ref('')
const handleFileSelected = (selectedFile) => {
  file.value = selectedFile
}

const handleCommitteeName = (name) => {
  selectedCommittee.value = name
}

const handleTypeId = (id) => {
  typeId.value = id
}

const handleUpload = async () => {
  if (!file.value) {
    showAlertModal('กรุณาเลือกไฟล์', 'error')
    return
  }

  // Validate file size
  const maxSizeInBytes = 10 * 1024 * 1024;
  if (file.value.size > maxSizeInBytes) {
    showAlertModal('ไฟล์ต้องมีขนาดไม่เกิน 10 MB', 'error');
    return;
  }

  const formData = new FormData()
  formData.append('shortpaperId', shortpaperId.value)
  formData.append('file', file.value)
  formData.append('fileTypeId', typeId.value)
  if (explanationVideo.value !== null) {
    formData.append('explanationVideo', explanationVideo.value)
  }
  formData.append('remark', remark.value)
  formData.append('studentId', studentId.value)

  // formData.append('remark', remark.value)
    if (typeId.value == 1 && selectedCommittee.value != '') {
      await assignCommittee()
    }

    const res = await ApiService.uploadFile(formData)
    if (res.status === 200) {
      showAlertModal(`บันทึกสำเร็จ`, 'success')
      await new Promise(resolve => setTimeout(resolve, 1000))
      await router.push(`/files`)
    } else if(res.status === 500) {
      showAlertModal('กรุณาเลือก อาจารย์ที่ปรึกษา', 'error')
    }
    else {
      showAlertModal(`เกิดข้อผิดพลาดเกี่ยวกับไฟล์`, 'error')
    }
}

const getShortPaper = async () => {
  const res = await ApiService.getShortPaper(studentId.value)
  if (res.status === 200) {
    const data = await res.data
    shortpaper.value = data.data
  }
}

const getFileType = async () => {
  try {
    const res = await ApiService.getFileType()

    if (res.status === 200) {
      const data = await res.data
      fileTypes.value = data.data
    }
  } catch (error) {
    console.error('Error fetching file types:', error)
    showAlertModal(`เกิดข้อผิดพลาดเกี่ยวกับการรับข้อมูล`, 'error')
  }
}

const fetchCommittees = async () => {
  try {
    const response = await ApiService.getCommittees()
    if (response.status === 200) {
      committees.value = response.data
    }
  } catch (error) {
    console.error('Error fetching committees:', error)
    showAlertModal(`เกิดข้อผิดพลาดเกี่ยวกับการรับข้อมูล`, 'error')
  }
}

const assignCommittee = async () => {
  try {
    const studentId = store.userId
    const committeeRoles = [
      {
        committeeName: selectedCommittee.value,
        isAdvisor: true,
        isPrincipal: false,
        isCommittee: false,
      },
    ]

    const response = await ApiService.updateCommitteeRolesForStudentAsync(
      studentId,
      committeeRoles
    )

    if (response.IsSuccess) {
      console.log('Committee assigned successfully:', response)
    } else {
      console.error('Failed to assign committee:', response.ErrorMessage)
    }
  } catch (error) {
    console.error('Error assigning committee:', error)
    showAlertModal(`เกิดข้อผิดพลาดเกี่ยวกับการส่งข้อมูล`, 'error')
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

onBeforeMount(async () => {
  await getFileType()
  await fetchCommittees()
  await getShortPaper()

  if (shortpaper.value == null) {
    shortpaperId.value = 0
  } else {
    shortpaperId.value = shortpaper.value.shortpaperId
  }
})
</script>

<template>
  <div>
    <div class="text-bluemain text-left text-sm mt-5 font-semibold">
      <p>
        <RouterLink :to="'/files'">
          <span class="hover:text-blueheader">เอกสารโครงงานทั้งหมด</span>
        </RouterLink>
        >
        <span class="font-bold text-sm">อัปโหลดเอกสารโครงงาน</span>
      </p>
    </div>

    <Header header="อัปโหลดเอกสาร" class="mt-3" />

    <div class="shadow-lg rounded-lg p-3">
      <div class="p-8">
        <div class="text-center">
          <FileInput
            label="อัปโหลดเอกสาร: "
            describe="*** เอกสารแต่งตั้งคณะกรรมการสำหรับอัปโหลดจะต้องเป็นไฟล์ PDF เท่านั้น ***"
            @fileSelected="handleFileSelected"
          />

          <div class="grid grid-cols-3 mt-8 text-sm ml-16">
            <div v-for="fileType in fileTypes" :key="fileType.typeId">
              <RadioButton
                name="fileType"
                :value="fileType.typeId"
                :label="fileType.typeName"
                :isChecked="fileType.typeId == route.params.typeId"
                @change="handleTypeId(fileType.typeId)"
              />
            </div>
          </div>
        </div>

        <div v-if="typeId == 5" class="py-3">
          <label for="input">วิดีโอคำอธิบายเพิ่มเติม</label>
          <div class="relative">
            <input
              type="text"
              id="input"
              class="inline-flex w-1/2 py-2 mt-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-bluemain focus:border-bluemain"
              placeholder="กรุณาแนบลิงก์"
              v-model="explanationVideo"
            />
          </div>
        </div>

        <div>
          <label for="input" class="text-left justify-start items-start py-3"
            >หมายเหตุ</label
          >
          <div class="relative">
            <textarea
              type="text"
              id="input"
              class="inline-flex w-1/2 py-2 mt-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-bluemain focus:border-bluemain"
              v-model="remark"
            />
          </div>
        </div>

        <div class="flex justify-end mt-5">
          <ButtonMain
            text="บันทึก"
            class="bg-bluemain border hover:bg-white hover:border-bluemain hover:text-bluemain ml-3"
            @click="handleUpload"
          />
        </div>

      </div>
    </div>

    <div v-if="typeId == 1" class="shadow-lg rounded-lg p-3 mt-8">
      <p>เลือกอาจารย์ที่ปรึกษาสำหรับใบ บ.1</p>
      <div class="grid grid-cols-4 mt-8 text-sm ml-16">
        <div v-for="committee in committees" :key="committee.committeeId">
          <RadioButton
            name="advisor"
            :value="committee.committeeId"
            :label="committee.firstname + ' ' + committee.lastname"
            @change="
              handleCommitteeName(
                committee.firstname + ' ' + committee.lastname
              )
            "
          />
        </div>
      </div>
    </div>

    <AlertModal
    :alertMessage="alertMessage"
    :is-alert-modal-open="isAlertModalOpen"
    :status="alertStatus"
    @toggle="toggleAlertModal"
  />
  </div>
</template>

<style></style>
