<script setup>
import { ref, computed, onMounted, onBeforeMount } from 'vue'
import ApiService from '../../composables/apiService'
import Header from '../../components/Header.vue'

const allStudents = ref([])
const allSubjects = ref([])
const allCommittees = ref([])

const getStudents = async () => {
  const res = await ApiService.getStudents()

  if (res.status === 200) {
    const data = await res.data
    allStudents.value = data.data
  }
}

const getSubjects = async () => {
  const res = await ApiService.getSubjects()
  if (res.status === 200) {
    const data = await res.data
    allSubjects.value = data.data
  }
}

const getCommittees = async () => {
  const res = await ApiService.getCommittees()
  if (res.status === 200) {
    const data = await res.data
    allCommittees.value = data
  }
}

// Document sending chart
const chartDocumentCounts = computed(() => {
  let sentFilesCount = allStudents.value.filter(
    (student) => student.shortpaperFiles.length > 0
  ).length

  let notSentFilesCount = allStudents.value.length - sentFilesCount

  return [sentFilesCount, notSentFilesCount]
})

const chartDocumentOptions = ref({
  chart: {
    type: 'donut',
  },
  labels: ['นักเรียนที่ส่งเอกสารแล้ว', 'นักเรียนที่ยังไม่ส่งเอกสาร'],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
})

// Student status chart
const studentStatusCounts = computed(() => {
  const oldStudentCount = allStudents.value.filter(
    (student) => student.status === 'old'
  ).length
  const newStudentCount = allStudents.value.filter(
    (student) => student.status === 'new'
  ).length
  return [oldStudentCount, newStudentCount]
})

const chartStudentStatusOptions = ref({
  chart: {
    type: 'donut',
  },
  labels: ['นักศึกษาเก่า', 'นักศึกษาใหม่'],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
})

// Student enrollment chart
const subjectEnrollmentOptions = computed(() => {
  const enrollmentCounts = {}

  // Count enrollment for each subject
  allStudents.value.forEach((student) => {
    student.subjects.forEach((subject) => {
      if (subject.isRegisteredSubject) {
        const label = `${subject.subjectId} ${subject.subjectName}`
        if (enrollmentCounts[label]) {
          enrollmentCounts[label]++
        } else {
          enrollmentCounts[label] = 1
        }
      }
    })
  })

  const seriesData = Object.values(enrollmentCounts)
  const labels = Object.keys(enrollmentCounts)

  return {
    series: seriesData,
    labels: labels,
  }
})

const chartStudentEnrollmentSeries = ref({
  chart: {
    type: 'pie',
  },
  labels: subjectEnrollmentOptions.value.labels,
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
})

// Student paper subject chart
const paperSubjectOptions  = computed(() => {
  const enrollmentCounts = {}

  // Count enrollment for each subject
  allStudents.value.forEach((student) => {
    student.subjects.forEach((subject) => {
      if (subject.isPaperSubject) {
        const label = `${subject.subjectId} ${subject.subjectName}`
        if (enrollmentCounts[label]) {
          enrollmentCounts[label]++
        } else {
          enrollmentCounts[label] = 1
        }
      }
    })
  })

  const seriesData = Object.values(enrollmentCounts)
  const labels = Object.keys(enrollmentCounts)

  return {
    series: seriesData,
    labels: labels,
  }
})

const chartPaperSubjectSeries = ref({
  chart: {
    type: 'pie',
  },
  labels: paperSubjectOptions.value.labels,
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
})

onBeforeMount(async () => {
  await getStudents()
  await getSubjects()
  await getCommittees()
})
</script>

<template>
  <div>
    <Header header="แดชบอร์ดข้อมูลนักศึกษา" />
    <div>
      <p>
        จำนวนนักศึกษาทั้งหมด:
        <span class="text-lg font-black text-bluemain drop-shadow-xl">
          {{ allStudents.length }}
        </span>
      </p>

      <p>
        จำนวนวิชาทั้งหมด:
        <span class="text-lg font-black text-bluemain drop-shadow-xl"
          >{{ allSubjects.length }}
        </span>
      </p>

      <p>
        จำนวนกรรมการทั้งหมด:
        <span class="text-lg font-black text-bluemain drop-shadow-xl">
          {{ allCommittees.length }}
        </span>
      </p>
    </div>
    <div class="grid grid-cols-2 gap-6">
      <div>
        <Header header="จำนวนการส่งเอกสารของนักศึกษา" />
        <div class="justify-center items-center flex">
          <apexchart
            width="500"
            type="donut"
            :options="chartDocumentOptions"
            :series="chartDocumentCounts"
          ></apexchart>
        </div>
      </div>
      <div>
        <Header header="จำนวนสถานะของนักศึกษา" />
        <div class="justify-center items-center flex">
          <apexchart
            width="440"
            type="donut"
            :options="chartStudentStatusOptions"
            :series="studentStatusCounts"
          ></apexchart>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-6">
      <div>
        <Header header="จำนวนนักศึกษาที่ลงทะเบียนแต่ละวิชา" />
        <div class="justify-center items-center flex">
          <apexchart
            width="500"
            type="pie"
            :options="subjectEnrollmentOptions"
            :series="chartStudentEnrollmentSeries"
          ></apexchart>
        </div>
      </div>
      <div>
        <Header header="จำนวนนักศึกษาที่ทำโครงงานแต่ละวิชา" />
        <div class="justify-center items-center flex">
          <apexchart
            width="470"
            type="pie"
            :options="paperSubjectOptions"
            :series="chartPaperSubjectSeries"
          ></apexchart>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
