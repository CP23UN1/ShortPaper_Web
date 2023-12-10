<script setup>
import { RouterLink } from 'vue-router'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
</script>
<template>
  <div>
    <nav class="p-2 bg-white">
      <div class="flex flex-wrap justify-between items-center">
        <RouterLink to="/">
          <img src="../assets/SIT-LOGO.png" class="h-12 mr-3" />
        </RouterLink>
        <button class="flex items-center bg-white">
          <svg
            width="24"
            height="24"
            viewBox="0 0 33 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.8436 2.66675C9.48362 2.66675 3.52362 8.64008 3.52362 16.0001C3.52362 23.3601 9.48362 29.3334 16.8436 29.3334C24.217 29.3334 30.1903 23.3601 30.1903 16.0001C30.1903 8.64008 24.217 2.66675 16.8436 2.66675ZM26.0836 10.6667H22.1503C21.7236 9.00008 21.1103 7.40008 20.3103 5.92008C22.7636 6.76008 24.8036 8.46675 26.0836 10.6667ZM16.857 5.38675C17.9636 6.98675 18.8303 8.76008 19.4036 10.6667H14.3103C14.8836 8.76008 15.7503 6.98675 16.857 5.38675ZM6.53695 18.6667C6.32362 17.8134 6.19029 16.9201 6.19029 16.0001C6.19029 15.0801 6.32362 14.1867 6.53695 13.3334H11.0436C10.937 14.2134 10.857 15.0934 10.857 16.0001C10.857 16.9067 10.937 17.7867 11.0436 18.6667H6.53695ZM7.63029 21.3334H11.5636C11.9903 23.0001 12.6036 24.6001 13.4036 26.0801C10.9503 25.2401 8.91029 23.5467 7.63029 21.3334ZM11.5636 10.6667H7.63029C8.91029 8.45341 10.9503 6.76008 13.4036 5.92008C12.6036 7.40008 11.9903 9.00008 11.5636 10.6667ZM16.857 26.6134C15.7503 25.0134 14.8836 23.2401 14.3103 21.3334H19.4036C18.8303 23.2401 17.9636 25.0134 16.857 26.6134ZM19.977 18.6667H13.737C13.617 17.7867 13.5236 16.9067 13.5236 16.0001C13.5236 15.0934 13.617 14.2001 13.737 13.3334H19.977C20.097 14.2001 20.1903 15.0934 20.1903 16.0001C20.1903 16.9067 20.097 17.7867 19.977 18.6667ZM20.3103 26.0801C21.1103 24.6001 21.7236 23.0001 22.1503 21.3334H26.0836C24.8036 23.5334 22.7636 25.2401 20.3103 26.0801ZM22.6703 18.6667C22.777 17.7867 22.857 16.9067 22.857 16.0001C22.857 15.0934 22.777 14.2134 22.6703 13.3334H27.177C27.3903 14.1867 27.5236 15.0801 27.5236 16.0001C27.5236 16.9201 27.3903 17.8134 27.177 18.6667H22.6703Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
    </nav>
  </div>
  <div
    class="flex flex-nowrap justify-between text-xs font-medium text-center shadow-lg w-full"
  >
    <!-- <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
          class="bg-bluemain w-max p-5 text-white flex hover:bg-white hover:text-bluemain fill-white hover:fill-bluemain items-center justify-between"
        >
          ตรวจสอบการส่งโครงงาน
          <svg width="8" height="8" viewBox="0 0 15 9" class="mx-5">
            <path
              d="M0.293015 0.792893C0.68354 0.402369 1.3167 0.402369 1.70723 0.792893L7.50012 6.58579L13.293 0.792894C13.6835 0.40237 14.3167 0.40237 14.7072 0.792894C15.0978 1.18342 15.0978 1.81658 14.7072 2.20711L8.20723 8.70711C8.01969 8.89464 7.76534 9 7.50012 9C7.23491 9 6.98055 8.89464 6.79301 8.70711L0.293015 2.20711C-0.097509 1.81658 -0.097509 1.18342 0.293015 0.792893Z"
            />
          </svg>
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <MenuItems
          class="absolute w-full origin-top-right rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="py-1">
            <MenuItem v-slot="{ active }">
              <a
                href="#"
                :class="[
                  active ? 'bg-slate-100 text-bluemain' : 'text-black',
                  'block px-4 py-2 text-xs',
                ]"
              >
                ตรวจสอบการส่งโครงงาน (ทั้งหมด)</a
              >
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a
                href="#"
                :class="[
                  active ? 'bg-slate-100  text-bluemain' : 'text-black',
                  'block px-4 py-2 text-xs',
                ]"
              >
                ตรวจสอบการส่งโครงงาน (รายวิชา)</a
              >
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a
                href="#"
                :class="[
                  active ? 'bg-slate-100  text-bluemain' : 'text-black',
                  'block px-4 py-2 text-xs',
                ]"
              >
                ตรวจสอบการส่งโครงงาน (บุคคล)</a
              >
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu> -->

    <!-- <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
          class="bg-bluemain w-full p-5 text-white flex hover:bg-white hover:text-bluemain fill-white hover:fill-bluemain items-center justify-between"
        >
          รายงานสรุปผลโครงงาน
          <svg width="8" height="8" viewBox="0 0 15 9" class="mx-5">
            <path
              d="M0.293015 0.792893C0.68354 0.402369 1.3167 0.402369 1.70723 0.792893L7.50012 6.58579L13.293 0.792894C13.6835 0.40237 14.3167 0.40237 14.7072 0.792894C15.0978 1.18342 15.0978 1.81658 14.7072 2.20711L8.20723 8.70711C8.01969 8.89464 7.76534 9 7.50012 9C7.23491 9 6.98055 8.89464 6.79301 8.70711L0.293015 2.20711C-0.097509 1.81658 -0.097509 1.18342 0.293015 0.792893Z"
            />
          </svg>
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <MenuItems
          class="absolute right-0 z-10 w-full origin-top-right rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="py-1">
            <MenuItem v-slot="{ active }">
              <a
                href="#"
                :class="[
                  active ? 'bg-slate-100 text-bluemain' : 'text-black',
                  'block px-4 py-2 text-xs',
                ]"
                >รายงานสรุปผลโครงงาน(ทั้งหมด)</a
              >
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a
                href="#"
                :class="[
                  active ? 'bg-slate-100  text-bluemain' : 'text-black',
                  'block px-4 py-2 text-xs',
                ]"
                >รายงานสรุปผลโครงงาน(รายวิชา)
              </a>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a
                href="#"
                :class="[
                  active ? 'bg-slate-100  text-bluemain' : 'text-black',
                  'block px-4 py-2 text-xs',
                ]"
                >รายงานสรุปผลโครงงาน(บุคคล)
              </a>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu> -->

    <div
      class="bg-bluemain hover:bg-white hover:text-bluemain text-white w-[233px] p-5"
    >
      ตรวจสอบการส่งโครงงาน
    </div>
    <div
      class="bg-bluemain hover:bg-white hover:text-bluemain text-white w-[233px] p-5"
    >
      รายงานสรุปผลโครงงาน
    </div>

    <!-- <div
      class="bg-bluemain hover:bg-white hover:text-bluemain text-white w-[233px] p-5"
    >
      <RouterLink to="/student"> ตรวจสอบข้อมูล(รายบุคคล) </RouterLink>
    </div> -->
    <div
      class="bg-bluemain hover:bg-white hover:text-bluemain text-white w-[233px] p-5"
    >
    <RouterLink to="/committees">แต่งตั้งคณะกรรมการ</RouterLink>
    </div>
    <div
      class="bg-bluemain hover:bg-white hover:text-bluemain text-white w-[233px] p-5"
    >
      <RouterLink to="/students"> ข้อมูลนักศึกษา </RouterLink>
    </div>
    <div
      class="bg-bluemain hover:bg-white hover:text-bluemain text-white w-[233px] p-5"
    >
      ส่งเอกสารโครงงาน
    </div>
    <div
      class="bg-bluemain hover:bg-white hover:text-bluemain text-white w-[233px] p-5"
    >
      ความคิดเห็นของกรรมการ
    </div>
    <div
      class="bg-bluemain hover:bg-white hover:text-bluemain text-white w-[233px] p-5"
    >
      เอกสารโครงงานที่ผ่านมา
    </div>
    <!-- <div class="bg-bluemain hover:bg-red-700 text-white w-[233px] p-5">
      ออกจากระบบ
    </div> -->
  </div>
</template>
