<script></script>
<template>
  <div class="grid grid-cols-2 mt-[24px]">
    <!-- First Column -->
    <div class="bg-white shadow-md p-2 text-sm h-fit w-[550px] space-y-4">
      <div>ส่งเอกสารฉบับแก้ไข</div>
      <hr />
      <div>
        <form><input type="checkbox" /> ชื่อกรรมการ 1</form>
      </div>

      <div>
        <form><input type="checkbox" /> ชื่อกรรมการ 2</form>
      </div>

      <div>
        <form><input type="checkbox" /> ชื่อกรรมการ 3</form>
      </div>
    </div>

    <!-- Second Column -->
    <div
      class="bg-white shadow-md p-2 text-sm text-gray-500 text-center h-full flex items-center justify-center"
    >
      filepreview
    </div>

    <!-- Third Column -->
    <div class="bg-white shadow-md p-2 text-sm h-fit w-[550px] space-y-4 mt-4">
      <div class="font-bold">ประวัติการส่งเอกสารฉบับแก้ไขแต่ละกรรมการ</div>
      <hr />
      <div class="flex flex-row justify-between items-center p-2 rounded">
        <div class="flex-1">กรรมการ 1 : ชื่อกรรมการ</div>
        <div class="mx-2">PDF</div>
        <div class="mx-2">Video</div>
        <div class="mx-2">Delete</div>
      </div>
      <div class="flex flex-row justify-between items-center p-2 rounded">
        <div class="flex-1">เอกสารบทความ</div>
        <div class="mx-2">View</div>
        <div class="mx-2">View</div>
        <div class="mx-2">-</div>
      </div>
      <div class="flex flex-row justify-between items-center p-2 rounded">
        <div class="flex-1">บทความฉบับแก้ไขครั้งที่ 1</div>
        <div class="mx-2">View</div>
        <div class="mx-2">View</div>
        <div class="mx-2">-</div>
      </div>
      <div class="flex flex-row justify-between items-center p-2 rounded">
        <div class="flex-1">บทความฉบับแก้ไขครั้งที่ 2</div>
        <div class="mx-2">View</div>
        <div class="mx-2">View</div>
        <div class="mx-2">-</div>
      </div>
    </div>

    <!-- Fourth Column -->
    <div class="bg-white shadow-md p-2 text-sm h-fit space-y-4 mt-4">
      <div>แบบไฟล์แสดงความคิดเห็น</div>
      <div>
        <input type="text" class="w-96 h-12 rounded-sm border-gray-200" />
        <button class="bg-bluemain text-white p-4">ค้นหา</button>
      </div>
    </div>
  </div>
</template>
