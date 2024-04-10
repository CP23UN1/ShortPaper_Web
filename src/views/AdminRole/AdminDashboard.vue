<script setup>
import { ref, computed, onMounted } from 'vue'
import ApiService from '../../composables/apiService'

const allStudents = ref([])

const getStudents = async () => {
  const res = await ApiService.getStudents()

  if (res.status === 200) {
    const data = await res.data
    allStudents.value = data.data
  }
}

const series = computed(() => {
  let sentFilesCount = allStudents.value.filter(
    (student) => student.shortpaperFiles.length > 0
  ).length

  let notSentFilesCount = allStudents.value.length - sentFilesCount

  return [sentFilesCount, notSentFilesCount]
})

const chartOptions = ref({
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

onMounted(async () => {
  await getStudents()
})
</script>

<template>
  <div>
    <apexchart
      width="500"
      type="donut"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<style></style>
