<script setup>
import { ref, onBeforeMount, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

import ApiService from '../../composables/apiService'

import Header from '../../components/Header.vue'
import ButtonMain from '../../components/ButtonMain.vue'
import NavbarStudent from '../../components/Navbar/NavbarStudent.vue'
import AlertModal from '../../components/Alert/AlertModal.vue'

const route = useRoute()
const router = useRouter()

const store = useAuthStore()
const studentId = ref(store.userId)
const shortpaperId = ref(route.params.shortpaperId)

const fileTypes = ref()
const studentFiles = ref()
const fileTypeName = ref()
const newComment = ref()
const lastedFileId = ref()
const committees = ref([])

const uploadIconSvg = `<svg class="w-[20px] h-[20px] text-bluemain hover:text-correct cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 19">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15h.01M4 12H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-3m-5.5 0V1.07M5.5 5l4-4 4 4"/>
  </svg>`

const uploadIconSvgDisabled = `<svg class="w-[20px] h-[20px] text-login" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 19">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15h.01M4 12H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-3m-5.5 0V1.07M5.5 5l4-4 4 4"/>
  </svg>`

const previewIconSvg = `<svg class="w-[20px] h-[20px] text-bluemain hover:text-correct cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 3v4a1 1 0 0 1-1 1H5m8 7.5 2.5 2.5M19 4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Zm-5 9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
</svg>
`

const previewIconSvgDisabled = `<svg class="w-[20px] h-[20px] text-login" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 3v4a1 1 0 0 1-1 1H5m8 7.5 2.5 2.5M19 4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Zm-5 9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
</svg>
`

const students = ref()

const getStudents = async () => {
  const res = await ApiService.getStudents()

  if (res.status === 200) {
    const data = await res.data
    students.value = data.data
  }
}

const getFileType = async () => {
  const res = await ApiService.getFileType()

  if (res.status === 200) {
    const data = await res.data
    fileTypes.value = data.data
  }
}

// File of shortpaper
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

const comments = ref([])
const selectedReplyId = ref()

const getComments = async () => {
  try {
    const res = await ApiService.getComments(lastedFileId.value)
    if (res.status === 200) {
      const data = await res.data

      comments.value = data.data
    } else {
      console.error('Failed to fetch comments:', res.statusText)
    }
  } catch (error) {
    console.error('Error fetching comments:', error)
  }
}

const sendComment = async () => {
  const commentObj = {
    commentContent: newComment.value,
    fileId: lastedFileId.value,
    authorId: studentId.value,
    replyId: selectedReplyId.value,
  }

  try {
    const res = await ApiService.sendComment(commentObj)
    if (res.status === 200) {
      showAlertModal('บันทึกสำเร็จ', 'success')
      await getComments()
      newComment.value = ''
    } else {
      console.error('Failed to send comment:', res.statusText)
    }
  } catch (error) {
    console.error('Error sending comment:', error)
  }
}

const getName = (authorId) => {
  if (authorId.startsWith('lec')) {
    if (!committees.value || committees.value.length === 0) {
      return 'Loading...'
    }

    const committee = committees.value.find((c) => c.committeeId === authorId)
    return committee
      ? `${committee.firstname} ${committee.lastname}`
      : 'Not found'
  } else if (authorId.startsWith('std')) {
    if (!students.value || students.value.length === 0) {
      return 'Loading...'
    }

    const student = students.value.find((c) => c.studentId === authorId)
    return student ? `${student.firstname} ${student.lastname}` : 'Not found'
  }
}

const getCommittees = async () => {
  const res = await ApiService.getCommittees()

  if (res.status === 200) {
    const data = await res.data
    committees.value = data
  }
}

// Modal
const iframePreview = ref(false)

const togglePreview = () => {
  iframePreview.value = !iframePreview.value

  if (iframePreview.value) {
    downloadFile()
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
    iframe.style.height = '750px'
    iframe.style.border = 'none'

    previewContainer.appendChild(iframe)

    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error downloading file:', error)
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
  await getStudents()
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
  <div class="mb-10 mx-14 xl:mx-32 lg:mx-28 md:mx-24 sm:mx-20">
    <NavbarStudent class="mt-[20px]" />
    <div class="text-bluemain text-left text-sm mt-5 font-semibold">
      <p>
        <RouterLink :to="'/files'">
          <span class="hover:text-blueheader">เอกสารโครงงาน</span>
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
          <p>ส่งเอกสาร</p>
        </div>

        <div
          class="bg-white text-gray-900 p-2 pl-4 rounded-es-lg rounded-ee-lg"
        >
          <div>
            <div class="grid grid-cols-3 my-2">
              <div class="col-span-2">
                <p class="text-start">อัปโหลดเอกสาร {{ fileTypeName }}</p>
              </div>
              <div class="col-span-1">
                <div
                  class="flex justify-end"
                  v-if="!studentFiles || studentFiles?.status === 'not_approve'"
                  v-html="uploadIconSvg"
                  @click="goToUpload(route.params.fileTypeId)"
                ></div>
                <div
                  class="flex justify-end"
                  v-else
                  v-html="uploadIconSvgDisabled"
                ></div>
              </div>
            </div>
            <div class="grid grid-cols-3 my-2">
              <div class="col-span-2">
                <p class="text-start">แก้ไขเอกสาร {{ fileTypeName }}</p>
              </div>
              <div class="col-span-1">
                <div
                  class="flex justify-end"
                  v-if="
                    studentFiles == null || studentFiles.status == 'not_approve'
                  "
                  v-html="uploadIconSvgDisabled"
                ></div>
                <div
                  class="flex justify-end"
                  v-else
                  v-html="uploadIconSvg"
                ></div>
              </div>
            </div>
            <div class="grid grid-cols-3 my-2">
              <div class="col-span-2">
                <p class="text-start">สถานะปัจจุบัน</p>
              </div>
              <div class="col-span-1">
                <p class="text-end">
                  {{
                    studentFiles
                      ? mapFileStatus(studentFiles.status)
                      : 'ยังไม่มีการอัปโหลด'
                  }}
                </p>
              </div>
            </div>
          </div>

          <div
            v-if="
              studentFiles?.status === 'approved' &&
              route.params.fileTypeId == 1
            "
          >
            <hr class="my-3" />
            <div class="flex justify-end">
              <ButtonMain
                text="ยื่นแก้ไขใบบ.1"
                class="bg-error border border-error hover:bg-white hover:text-error mb-3"
                @click="goToUpload(route.params.fileTypeId)"
              />
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
          class="bg-white text-gray-900 p-2 pl-4 rounded-es-lg rounded-ee-lg"
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
                v-html="previewIconSvg"
                v-if="studentFiles !== null"
                @click="togglePreview"
              ></div>
              <div
                class="flex justify-end"
                v-html="previewIconSvgDisabled"
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
      <div class="mx-3" v-if="comments">
        <div
          class="text-white uppercase bg-bluemain p-2 pl-4 rounded-ss-lg rounded-se-lg"
        >
          <p>ความคิดเห็นของที่ปรึกษา และคณะกรรมการ</p>
        </div>

        <div>
          <div
            class="bg-white text-gray-900 p-2 pl-4 rounded-es-lg rounded-ee-lg shadow-lg mb-3"
            v-for="comment in comments"
            :key="comment.commentId"
          >
            <div v-if="comments.length !== 0">
              <div class="mb-3">
                <div class="grid grid-cols-3">
                  <div class="col-span-2 my-2">
                    <p class="font-bold">
                      คณะกรรมการ {{ getName(comment.authorId) }}
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
                <div class="justify-end flex">
                  <input
                    type="radio"
                    :id="'replyId_' + comment.commentId"
                    :value="comment.commentId"
                    v-model="selectedReplyId"
                  />
                  <label :for="'replyId_' + comment.commentId" class="ml-1.5"
                    >ตอบกลับ</label
                  >
                </div>

                <div v-if="comment.replyComment.length !== 0">
                  <hr class="my-3" />
                  <p class="font-black">ความคิดเห็นตอบกลับ</p>
                  <div v-for="reply in comment.replyComment">
                    <hr class="mt-3" />
                    <div class="grid grid-cols-3">
                      <div class="col-span-2 my-2">
                        <p class="font-bold">
                          นักศึกษา {{ getName(reply.authorId) }}
                        </p>
                      </div>
                      <div class="col-span-1 my-2">
                        <p class="text-login">
                          {{
                            reply
                              ? new Date(reply.createdDatetime).toLocaleString(
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
                    <p>{{ reply.commentContent }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- div 2 -->
      <div class="grid">
        <div class="shadow-md mx-3" v-if="selectedReplyId">
          <div
            class="text-white uppercase bg-bluemain p-2 pl-4 rounded-ss-lg rounded-se-lg"
          >
            <p>ส่งความคิดเห็นของนักศึกษา</p>
          </div>

          <div
            class="bg-white text-gray-900 p-2 pl-4 rounded-es-lg rounded-ee-lg"
          >
            <label for="stdComment">ความคิดเห็นของนักศึกษา</label>
            <textarea
              type="text"
              id="stdComment"
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
      </div>
    </div>
  </div>

  <div
    class="fixed top-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50"
    :class="{ hidden: !iframePreview }"
    id="iframe-modal"
  >
    <div class="w-full h-[90%] mx-auto p-8 bg-white rounded-lg shadow-md">
      <div class="mb-4 flex justify-end">
        <button type="button" @click="togglePreview">
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span class="sr-only">ปิดหน้าต่าง</span>
        </button>
      </div>
      <div id="preview-container" v-if="iframePreview"></div>
    </div>
  </div>

  <AlertModal
    :alertMessage="alertMessage"
    :is-alert-modal-open="isAlertModalOpen"
    :status="alertStatus"
    @toggle="toggleAlertModal"
  />
</template>

<style></style>
