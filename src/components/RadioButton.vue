<script setup>
const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
  value: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="flex items-center mb-4">
    <input
      type="radio"
      :id="id"
      :value="value"
      :name="name"
      class="w-4 h-4 text-bluemain bg-gray-100 border-gray-300 focus:ring-bluemain"
      :checked="isChecked"
    />
    <label :for="id" class="ms-2">{{ label }}</label>
  </div>
</template>

<style></style>
