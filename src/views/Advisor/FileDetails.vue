<script>
import SearchInput from '../../components/SearchInput.vue'

</script>
<template>
    <div class="grid grid-cols-2 mt-[24px] space-x-4">

        <!-- First Column -->
        <div>
            <div class="bg-[#0339A6] text-white text-sm w-full p-2 h-fit rounded-tr-md rounded-tl-md">ข้อมูลนักศึกษา
            </div>
            <div class="bg-white shadow-md p-2 text-sm h-fit items-center rounded-br-md rounded-bl-md">
                <div class="grid grid-cols-2 ">
                    <div class="font-bold">รหัสนักศึกษา</div>
                    <div>63130500062</div>

                    <div class="font-bold">ชื่อ นามสกุล</div>
                    <div>วรัญญา สุขใจ</div>

                    <div class="font-bold">ชื่อหัวข้อโครงงาน</div>
                    <div>The Rise of Edge Computing: Architecture, Applications, and Challenges</div>

                    <div class="font-bold">รายวิชาจัดทำ IS</div>
                    <div>INT421 Applied Machine Learning</div>
                </div>
            </div>
        </div>

        <!-- Second Column -->
        <div class="bg-white shadow-md p-2 text-sm h-fit grid grid-cols-2 rounded-md">
            <div>เอกสารบทความ</div>
            <div class="underline text-blue-500 text-right">View</div>
            <div class="mt-4">เอกสารฉบับแก้ไขครั้งที่ 1</div>
            <div class="text-right mt-4">No Data</div>
            <div class="mt-4">เอกสารฉบับแก้ไขครั้งที่ 2</div>
            <div class="text-right mt-4">No Data</div>
        </div>
    </div>
    <div class="grid grid-cols-2 space-x-4">
        <!-- Third Column -->
        <div class="bg-white shadow-md p-2 text-sm h-fit space-y-4 mt-4 w-full rounded-md">
            <div>แบบไฟล์แสดงความคิดเห็น</div>
            <div class="space-x-4">
                <input type="text" class="w-96 h-8 rounded-sm border-gray-200 text-sm" placeholder="อัพโหลดไฟล์">
                <button class="bg-[#0339A6] text-white py-2 px-8 rounded-sm">ค้นหา</button>
            </div>
            <!-- dropdown -->
            <div>ผลการตรวจบทความ</div>
            <div>
                <input type="text" class="w-96 h-8 rounded-sm border-gray-200 text-sm" placeholder="ไม่ผ่าน (แก้ไข)">
            </div>
            <hr>
            <div>แสดงความคิดเห็น</div>
            <form>
                <textarea type="text" class="w-full rounded-sm border-gray-200 h-24" placeholder=""></textarea>
            </form>
        </div>


        <!-- Fifth Column -->
        <div >
            <div
                class="bg-white shadow-md mb-4 p-2 text-sm text-gray-500 text-center h-full flex items-center justify-center rounded-md">
                filepreview
            </div>
            <div class="space-x-4 flex justify-end">
                <button class="bg-[#919191] text-white py-2 px-8 rounded-sm">ย้อนกลับ</button>
                <button class="bg-[#027368] text-white py-2 px-8 rounded-sm">บันทึกข้อมูล</button>
            </div>
        </div>

    </div>
</template>