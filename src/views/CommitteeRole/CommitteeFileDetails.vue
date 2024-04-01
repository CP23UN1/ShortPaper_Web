<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

import ApiService from '../../composables/apiService'

import Header from '../../components/Header.vue'
import ButtonMain from '../../components/ButtonMain.vue'

const route = useRoute()
const router = useRouter()

const store = useAuthStore()
const userId = ref(store.userId)

const fileTypes = ref()
const studentFiles = ref()
const fileTypeName = ref()

const newComment = ref()

const lastedFileId = ref()
const shortpaperId = ref(route.params.shortpaperId)

const committees = ref([])

const student = ref()

const uploadIconSvg = `<svg class="w-[20px] h-[20px] text-bluemain hover:text-correct cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 19">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15h.01M4 12H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-3m-5.5 0V1.07M5.5 5l4-4 4 4"/>
  </svg>`

const uploadIconSvgDisabled = `<svg class="w-[20px] h-[20px] text-login" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 19">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15h.01M4 12H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-3m-5.5 0V1.07M5.5 5l4-4 4 4"/>
  </svg>`

const downloadIconSvg = `<svg class="w-[20px] h-[20px] text-bluemain hover:text-correct cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 19">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15h.01M4 12H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-3M9.5 1v10.93m4-3.93-4 4-4-4"/>
  </svg>`

const downloadIconSvgDisabled = `<svg class="w-[20px] h-[20px] text-login" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 19">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15h.01M4 12H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-3M9.5 1v10.93m4-3.93-4 4-4-4"/>
  </svg>`

const getStudentById = async () => {
  const res = await ApiService.getStudentById(route.params.studentId)

  if (res.status === 200) {
    const data = await res.data
    student.value = data.data
  }
}

const getFileType = async () => {
  const res = await ApiService.getFileType()

  if (res.status === 200) {
    const data = await res.data
    fileTypes.value = data.data
  }
}

const getFilebyFiletypeAndShortpaper = async () => {
  const res = await ApiService.getFilebyFiletypeAndShortpaper(
    route.params.fileTypeId,
    route.params.shortpaperId
  )

  if (res.status === 200) {
    const data = await res.data
    studentFiles.value = data.data
    if (studentFiles.value !== null) {
      lastedFileId.value = studentFiles.value.shortpaperFileId
    }
  }
}

const getFileTypeName = (fileTypeId) => {
  const fileType = fileTypes.value.find(
    (type) => type.typeId === parseInt(fileTypeId)
  )
  return fileType ? fileType.typeName : '-'
}

const committeeComments = ref([])
const studentComments = ref([])

const getComments = async () => {
  try {
    const res = await ApiService.getComments(lastedFileId.value)
    if (res.status === 200) {
      const data = await res.data
      const allComments = data.data

      if (allComments !== null) {
        committeeComments.value = allComments.filter((comment) =>
          comment.authorId.startsWith('lec')
        )
        studentComments.value = allComments.filter((comment) =>
          comment.authorId.startsWith('std')
        )
      }
    } else {
      console.error('Failed to fetch comments:', res.statusText)
    }
  } catch (error) {
    console.error('Error fetching comments:', error)
  }
}

const getCommitteeName = (authorId) => {
  if (!committees.value || committees.value.length === 0) {
    return 'Loading...'
  }

  const committee = committees.value.find((c) => c.committeeId === authorId)
  return committee
    ? `${committee.firstname} ${committee.lastname}`
    : 'Not found'
}

const getCommittees = async () => {
  const res = await ApiService.getCommittees()

  if (res.status === 200) {
    const data = await res.data
    committees.value = data
  }
}

const downloadFile = async () => {
  try {
    const res = await ApiService.downloadFile(
      shortpaperId.value,
      route.params.fileTypeId
    )
    const blob = new Blob([res.data], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)

    let previewContainer = document.getElementById('preview-container')
    if (!previewContainer) {
      previewContainer = document.createElement('div')
      previewContainer.id = 'preview-container'
      document.body.appendChild(previewContainer)
    }

    const iframe = document.createElement('iframe')
    iframe.src = url
    iframe.style.width = '100%'
    iframe.style.height = '500px'
    iframe.style.border = 'none'

    previewContainer.appendChild(iframe)

    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error downloading file:', error)
  }
}

const sendComment = async () => {
  const commentObj = {
    commentContent: newComment.value,
    fileId: lastedFileId.value,
    authorId: userId.value,
  }

  try {
    const res = await ApiService.sendComment(commentObj)
    if (res.status === 200) {
      alert('บันทึกสำเร็จ')
      await getComments()
      newComment.value = ''
    } else {
      console.error('Failed to send comment:', res.statusText)
    }
  } catch (error) {
    console.error('Error sending comment:', error)
  }
}

const goToUpload = (fileTypeId) => {
  router.push({
    path: `/upload/${fileTypeId}`,
  })
}

const mapFileStatus = (status) => {
  switch (status) {
    case 'not_approve':
      return 'ยังไม่ได้รับการอนุมัติ'
    case 'approved':
      return 'อนุมัติเรียบร้อย'
    default:
      return 'ยังไม่มีการอัปโหลด'
  }
}

onBeforeMount(async () => {
  await getStudentById()
  await getCommittees()
  await getFileType()
  await getFilebyFiletypeAndShortpaper()
  if (studentFiles.value !== null) {
    await getComments()
  }
  fileTypeName.value = getFileTypeName(route.params.fileTypeId)
})
</script>

<template>
  <div class="mb-10">
    <div class="text-bluemain text-left text-sm mt-5 font-semibold">
      <p>
        <RouterLink :to="'/committee/students'">
          <span class="hover:text-blueheader">ข้อมูลเอกสารโครงงาน</span>
        </RouterLink>
        >
        <RouterLink :to="`/committee/student/${route.params.studentId}`">
          <span class="hover:text-blueheader">ข้อมูลนักศึกษา</span>
        </RouterLink>
        >
        <span class="font-bold text-sm">รายละเอียดเอกสาร</span>
      </p>
    </div>

    <Header :header="`เอกสาร${fileTypeName}`" class="mt-5" />
    <div class="grid grid-cols-2 my-5">
      <!-- div 1 -->
      <div class="shadow-md mx-3">
        <div
          class="text-white uppercase bg-bluemain p-2 pl-4 rounded-ss-lg rounded-se-lg"
        >
          <p>ข้อมูลนักศึกษา</p>
        </div>

        <div
          class="bg-white border-b text-gray-900 p-2 pl-4 rounded-es-lg rounded-ee-lg"
        >
          <div>
            <div class="grid grid-cols-3 my-2">
              <div class="col-span-2">
                <p class="text-start">รหัสนักศึกษา</p>
              </div>
              <div class="col-span-1">
                {{ student.studentId }}
              </div>
            </div>
            <div class="grid grid-cols-3 my-2">
              <div class="col-span-2">
                <p class="text-start">ชื่อ</p>
              </div>
              <div class="col-span-1">
                {{ student.firstname }} {{ student.lastname }}
              </div>
            </div>
            <div class="grid grid-cols-3 my-2">
              <div class="col-span-2">
                <p class="text-start">ชื่อหัวข้อโครงงาน</p>
              </div>
              <div class="col-span-1">
                {{
                  student.shortpaper.shortpaperTopic
                    ? student.shortpaper.shortpaperTopic
                    : 'ยังไม่มีการตั้งชื่อหัวข้อ'
                }}
              </div>
            </div>
            <div class="grid grid-cols-3 my-2">
              <div class="col-span-2">
                <p class="text-start">รายวิชาจัดทำ IS</p>
              </div>
              <div class="col-span-1" v-if="student.subjects.length !== 0">
                {{ student.subjects.subjectId }}
                {{ student.subjects.subjectName }}
                <span v-if="student.subjects.isRegisteredSubject">
                  : วิชาที่ลงทะเบียน</span
                >
                <span v-if="student.subjects.isPaperSubject">
                  : วิชาที่ทำ IS Report</span
                >
              </div>
              <div v-else class="col-span-1">-</div>
            </div>
          </div>
        </div>
      </div>
      <!-- div 2 -->
      <div class="shadow-md mx-3">
        <div
          class="text-white uppercase bg-bluemain p-2 pl-4 rounded-ss-lg rounded-se-lg"
        >
          <p>ดาวน์โหลดเอกสาร</p>
        </div>

        <div
          class="bg-white border-b text-gray-900 p-2 pl-4 rounded-es-lg rounded-ee-lg"
        >
          <div class="text-end" v-if="studentFiles !== null">
            <p>
              อัปโหลดล่าสุดวันที่
              {{
                studentFiles
                  ? new Date(studentFiles.updatedDatetime).toLocaleString(
                      'th-TH',
                      {
                        timeZone: 'Asia/Bangkok',
                      }
                    )
                  : 'ยังไม่มีการอัปโหลด'
              }}
            </p>
          </div>
          <div class="text-end text-login mt-2">
            <p>ไฟล์</p>
          </div>

          <div class="grid grid-cols-3 mt-2">
            <div class="col-span-2">
              <p class="text-start">เอกสาร{{ fileTypeName }} ครั้งล่าสุด</p>
            </div>
            <div class="col-span-1">
              <div
                class="flex justify-end"
                v-html="downloadIconSvg"
                v-if="studentFiles !== null"
                @click="downloadFile"
              ></div>
              <div
                class="flex justify-end"
                v-html="downloadIconSvgDisabled"
                v-else
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- rows 2 -->
    <div class="grid grid-cols-2 my-5" v-if="studentFiles !== null">
      <!-- div 1 -->
      <div class="shadow-md mx-3" v-if="committeeComments.length !== 0">
        <div
          class="text-white uppercase bg-bluemain p-2 pl-4 rounded-ss-lg rounded-se-lg"
        >
          <p>ความคิดเห็นของที่ปรึกษา และคณะกรรมการ</p>
        </div>

        <div
          class="bg-white border-b text-gray-900 p-2 pl-4 rounded-es-lg rounded-ee-lg"
        >
          <div v-if="committeeComments.length !== 0">
            <div
              v-for="comment in committeeComments"
              :key="comment.commentId"
              class="mb-3"
            >
              <div class="grid grid-cols-3">
                <div class="col-span-2 my-2">
                  <p class="font-bold">
                    คณะกรรมการ {{ getCommitteeName(comment.authorId) }}
                  </p>
                </div>
                <div class="col-span-1 my-2">
                  <p class="text-login">
                    {{
                      comment
                        ? new Date(comment.createdDatetime).toLocaleString(
                            'th-TH',
                            {
                              timeZone: 'Asia/Bangkok',
                            }
                          )
                        : 'ยังไม่มีการอัปโหลด'
                    }}
                  </p>
                </div>
              </div>

              <p>{{ comment.commentContent }}</p>
              <hr class="my-3" />
            </div>
          </div>
        </div>
      </div>
      <!-- div 2 -->
      <div class="grid">
        <div class="shadow-md mx-3">
          <div
            class="text-white uppercase bg-bluemain p-2 pl-4 rounded-ss-lg rounded-se-lg"
          >
            <p>ส่งคำชี้แจงของกรรมการ</p>
          </div>

          <div
            class="bg-white border-b text-gray-900 p-2 pl-4 rounded-es-lg rounded-ee-lg"
          >
            <label for="reply">คำชี้แจงของกรรมการ</label>
            <textarea
              type="text"
              id="reply"
              class="mt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border-gray-300 rounded-md"
              v-model="newComment"
            />
            <div class="justify-end flex my-3">
              <ButtonMain
                text="ส่ง"
                class="bg-correct text-white hover:bg-white hover:text-correct outline outline-2 outline-correct"
                @click="sendComment"
              />
            </div>
          </div>
        </div>
        <!-- below div 2 -->
        <div class="shadow-md m-3" v-if="studentComments.length !== 0">
          <div
            class="text-white uppercase bg-bluemain p-2 pl-4 rounded-ss-lg rounded-se-lg"
          >
            <p>คำชี้แจงของนักศึกษา</p>
          </div>

          <div
            class="bg-white border-b text-gray-900 p-2 pl-4 rounded-es-lg rounded-ee-lg"
          >
            <div v-if="studentComments.length !== 0">
              <div v-for="comment in studentComments" :key="comment.commentId">
                <p>{{ comment.commentContent }}</p>
                <p class="font-black text-end mt-2">
                  {{ student.firstname }} {{ student.lastname }}
                </p>
                <p class="text-login text-end">
                  {{
                    new Date(comment.createdDatetime).toLocaleString('th-TH', {
                      timeZone: 'Asia/Bangkok',
                    })
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="preview-container"></div>
</template>

<style></style>
