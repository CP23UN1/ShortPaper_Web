<script setup>
import { ref, computed, onMounted, onBeforeMount } from 'vue'
import ApiService from '../../composables/apiService'

const allStudents = ref([])
const studentSentData = ref([])

const getStudents = async () => {
  const res = await ApiService.getStudents()

  if (res.status === 200) {
    const data = await res.data
    allStudents.value = data.data
  }
}

const chartData = computed(() => {
  const sentFiles = allStudents.value.filter((student) => {
    return student.fileStatusByType.some((status) => status.hasUploaded)
  }).length

  const noFiles = allStudents.value.length - sentFiles

  return [
    { name: 'Sent Files', value: 2 },
    { name: 'No Files', value: 3 },
  ]
})

const chartType = ref('pie')

// const chartOptions = computed(() => ({
//   labels: chartData.value.map((item) => item.name),
//   series: chartData.value.map((item) => item.value),
// }));

const chartOptions = ref({
  chart: {
    type: 'donut',
  },
  labels: ['sent1', 'sent2'],
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

const series = ref([30, 40])
// onBeforeMount(async () => {
//   await getStudents();
// });
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
