<script>
</script>

<template>
  <div class="grid grid-cols-2 mt-[24px] space-x-2">
    <!-- First Column -->
    <div class="bg-white shadow-md p-2 text-sm h-fit space-y-4">
      <div class="font-bold">ความคิดเห็นคณะกรรมการ</div>
      <hr />
      <div>ความคิดเห็นครั้งที่ 1</div>
      <div>ผลการแสดงความคิดเห็น</div>
      <div>ไฟล์แนบความคิดเห็น</div>
      <div>ผลการตรวจบทความ</div>
    </div>

    <!-- Second Column -->
    <div class="bg-white shadow-md p-2 text-sm h-fit space-y-4">
      <div class="font-bold">คำชี้แจงของส่งคณะกรรมการ</div>
      <hr />
      <form>
        <textarea
          type="text"
          class="w-full rounded-sm border-gray-200 h-24"
          placeholder=""
        ></textarea>
      </form>
      <label class="text-xs font-bold text-red-600"
        >***หน้าจอนี้มิใช่การส่งบทความฉบับแก้ไขเป็นเพียงการส่งข้อความถึงคณะกรรมการเท่านั้น***</label
      >
    </div>
  </div>
  <div class="grid grid-cols-2 mt-[8px] space-x-2">
    <!-- Third Column -->
    <div class="bg-white shadow-md p-2 text-sm h-fit space-y-4 mt-4">
      <div class="font-bold">คำชี้แจงของนักศึกษา</div>
      <hr />
      <form>
        <textarea
          type="text"
          class="w-full rounded-sm border-gray-200 h-24"
          placeholder=""
        ></textarea>
      </form>
    </div>

    <div class="text-right">
      <!-- <ConfirmButton /> -->
      <button
        class="py-2 px-4 border-[#0A7373] text-[#0A7373] text-sm rounded-[4px] border-2 mt-2"
      >
        บันทึก
      </button>
    </div>
  </div>
</template>
