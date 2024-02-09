<script>
import ConfirmButton from '../components/ConfirmButton.vue';


</script>
<template>
    <div class="grid grid-cols-2 mt-[24px]">

        <!-- First Column -->
        <div class="bg-white shadow-md p-2 text-sm h-fit w-[550px] space-y-4">
            <div class="font-bold">ความคิดเห็นคณะกรรมการ</div>
            <hr />
            <div>ความคิดเห็นครั้งที่ 1</div>
            <div>ผลการแสดงความคิดเห็น</div>
            <div>ไฟล์แนบความคิดเห็น</div>
            <div>ผลการตรวจบทความ</div>
        </div>

        <!-- Second Column -->
        <div class="bg-white shadow-md p-2 text-sm h-fit w-[550px] space-y-4 mt-4">
            <div class="font-bold">คำชี้แจงของส่งคณะกรรมการ</div>
            <hr />
            <form>
                <textarea type="text" class="w-full rounded-sm border-gray-200 h-24" placeholder=""></textarea>
            </form>
            <label class="text-xs font-bold text-red-600">***หน้าจอนี้มิใช่การส่งบทความฉบับแก้ไขเป็นเพียงการส่งข้อความถึงคณะกรรมการเท่านั้น***</label>
        </div>

        <!-- Third Column -->
        <div class="bg-white shadow-md p-2 text-sm h-fit w-[550px] space-y-4 mt-4">
            <div class="font-bold">คำชี้แจงของนักศึกษา</div>
            <hr />
            <form>
                <textarea type="text" class="w-full rounded-sm border-gray-200 h-24" placeholder=""></textarea>
            </form>
        </div>

        <div>
        <ConfirmButton />
        </div>

    </div>
</template>
  