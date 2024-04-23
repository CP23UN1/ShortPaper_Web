<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import ApiService from '../../composables/apiService'

import Header from '../../components/Header.vue'
import ButtonMain from '../../components/ButtonMain.vue'
import NavbarCommittee from '../../components/Navbar/NavbarCommittee.vue'
import AlertModal from '../../components/Alert/AlertModal.vue'

const route = useRoute()
const store = useAuthStore()

const userId = ref(store.userId)
const studentId = ref(route.params.studentId)
const shortpaperId = ref(route.params.shortpaperId)

const comments = ref([])
const shortpaper = ref({})
const fileTypes = ref([])
const studentFiles = ref({})
const fileTypeName = ref('')
const committees = ref([])
const newComment = ref('')
const students = ref()
const student = ref({})

const committeeRole = ref()

const mapUserRole = () => {
  committees.value = shortpaper.value.committees

  const userCommittee = committees.value.find(
    (committee) => committee.committeeId === userId.value
  )

  if (userCommittee) {
    if (userCommittee.isAdvisor === 1) {
      return 'Advisor'
    } else if (userCommittee.isPrincipal === 1) {
      return 'Principal'
    } else if (userCommittee.isCommittee === 1) {
      return 'Committee'
    } else {
      return 'Unknown'
    }
  } else {
    return 'Not a committee member'
  }
}

const previewIconSvg = `<svg class="w-[20px] h-[20px] text-bluemain hover:text-correct cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 3v4a1 1 0 0 1-1 1H5m8 7.5 2.5 2.5M19 4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Zm-5 9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
</svg>
`

const previewIconSvgDisabled = `<svg class="w-[20px] h-[20px] text-login" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 3v4a1 1 0 0 1-1 1H5m8 7.5 2.5 2.5M19 4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Zm-5 9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
</svg>
`

const getFileType = async () => {
  try {
    const res = await ApiService.getFileType()
    if (res.status === 200) {
      fileTypes.value = res.data.data
    }
  } catch (error) {
    console.error('Error fetching file types:', error)
  }
}

const getFilebyFiletypeAndShortpaper = async () => {
  try {
    const res = await ApiService.getFilebyFiletypeAndShortpaper(
      route.params.fileTypeId,
      shortpaperId.value
    )
    if (res.status === 200) {
      studentFiles.value = res.data.data
      if (studentFiles.value !== null) {
        getFileTypeName(route.params.fileTypeId)
      }
    }
  } catch (error) {
    console.error('Error fetching files by file type and short paper:', error)
  }
}

const getFileTypeName = (fileTypeId) => {
  const fileType = fileTypes.value.find(
    (type) => type.typeId === parseInt(fileTypeId)
  )
  fileTypeName.value = fileType ? fileType.typeName : '-'
}

const getComments = async () => {
  try {
    const res = await ApiService.getComments(
      studentFiles.value.shortpaperFileId
    )
    if (res.status === 200) {
      comments.value = res.data.data
    } else {
      console.error('Failed to fetch comments:', res.statusText)
    }
  } catch (error) {
    console.error('Error fetching comments:', error)
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

const getShortpaper = async () => {
  try {
    const res = await ApiService.getShortPaper(route.params.studentId)
    if (res.status === 200) {
      shortpaper.value = res.data.data
      student.value = res.data.data.student
    }
  } catch (error) {
    console.error('Error fetching short paper:', error)
  }
}

const getStudents = async () => {
  const res = await ApiService.getStudents()
  if (res.status === 200) {
    students.value = res.data.data
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

const sendComment = async () => {
  const commentObj = {
    commentContent: newComment.value,
    fileId: studentFiles.value.shortpaperFileId,
    authorId: userId.value,
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

const updateFileStatus = async () => {
  const res = await ApiService.updateFileStatus(
    studentFiles.value.shortpaperFileId
  )

  if (res.status === 200) {
    showAlertModal('อนุมัติเอกสารสำเร็จ', 'success')
    await getShortpaper()
    await getFilebyFiletypeAndShortpaper()
  }
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
  await getShortpaper()
  await getFileType()
  await getFilebyFiletypeAndShortpaper()
  if (studentFiles.value !== null) {
    await getComments()
  }

  committeeRole.value = mapUserRole()
})
</script>

<template>
  <div class="mb-10 mx-14 xl:mx-32 lg:mx-28 md:mx-24 sm:mx-20">
    <NavbarCommittee class="mt-[20px]" />
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
          class="bg-white text-gray-900 p-2 pl-4 rounded-es-lg rounded-ee-lg"
        >
          <div>
            <div class="grid grid-cols-3 my-2">
              <div class="col-span-2">
                <p class="text-start">รหัสนักศึกษา</p>
              </div>
              <div class="col-span-1">
                {{ studentId }}
              </div>
            </div>
            <div class="grid grid-cols-3 my-2">
              <div class="col-span-2">
                <p class="text-start">ชื่อ</p>
              </div>
              <div class="col-span-1">
                {{ student.firstname }}
                {{ student.lastname }}
              </div>
            </div>
            <div class="grid grid-cols-3 my-2">
              <div class="col-span-2">
                <p class="text-start">ชื่อหัวข้อโครงงาน</p>
              </div>
              <div class="col-span-1">
                {{
                  shortpaper.shortpaperTopic
                    ? shortpaper.shortpaperTopic
                    : 'ยังไม่มีการตั้งชื่อหัวข้อ'
                }}
              </div>
            </div>
            <div class="grid grid-cols-3 my-2">
              <div class="col-span-2">
                <p class="text-start">รายวิชา</p>
              </div>
              <div class="col-span-1" v-if="shortpaper.subjects">
                <p
                  v-for="subject in shortpaper.subjects"
                  :id="subject.subjectId"
                  class="mb-2"
                >
                  {{ subject.subjectId }}
                  {{ subject.subjectName }}
                  <span v-if="subject.isRegisteredSubject">
                    : วิชาที่ลงทะเบียน</span
                  >
                  <span v-if="subject.isPaperSubject">
                    : วิชาที่ทำ IS Report</span
                  >
                </p>
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

          <div class="grid grid-cols-3 mt-2">
            <div class="col-span-2">
              <p class="text-start">สถานะเอกสาร</p>
            </div>
            <div class="col-span-1">
              {{ mapFileStatus(studentFiles.status) }}
            </div>
          </div>

          <div
            class="text-end mt-3"
            v-if="
              committeeRole == 'Advisor' &&
              studentFiles &&
              studentFiles.status == 'not_approve'
            "
          >
            <ButtonMain
              text="อนุมัติเอกสาร"
              @click="updateFileStatus"
              class="bg-correct text-white hover:bg-white hover:text-correct outline outline-2 outline-correct"
            />
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
            <div v-if="comment">
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

                    <!-- <div class="justify-end flex">
                      <input
                        type="radio"
                        :id="'replyId_' + reply.commentId"
                        :value="reply.commentId"
                        v-model="selectedReplyId"
                      />
                      <label :for="'replyId_' + reply.commentId" class="ml-1.5"
                        >ตอบกลับ</label
                      >
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- div 2 -->
      <div class="">
        <div class="shadow-md mx-3">
          <div
            class="text-white uppercase bg-bluemain p-2 pl-4 rounded-ss-lg rounded-se-lg"
          >
            <p>ส่งคำชี้แจงของกรรมการ</p>
          </div>

          <div
            class="bg-white text-gray-900 p-2 pl-4 rounded-es-lg rounded-ee-lg"
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
