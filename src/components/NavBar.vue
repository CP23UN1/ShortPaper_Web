<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="bg-pink-200 text-pink-600 p-4">
    <div class="grid grid-cols-2">
      <div><span>SIT</span></div>
      <div>
        <router-link to="/">
          <button class="mr-6 hover:text-black">home</button>
        </router-link>
        <router-link to="/studentlist">
          <button class="mr-6 hover:text-black">student list</button>
        </router-link>
        <router-link to="/editstudent">
          <button class="mr-6 hover:text-black">edit student</button>
        </router-link>
        <!-- <button class="mr-4 hover:text-black"></button> -->
      </div>
    </div>
  </div>
</template>

<style></style>
