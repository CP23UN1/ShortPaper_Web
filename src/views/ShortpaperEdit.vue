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
        <div class="bg-white shadow-md p-2 text-sm text-gray-500 text-center h-full flex items-center justify-center">
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
            <div class="font-bold">แบบไฟล์แสดงความคิดเห็น</div>

            <div class="space-x-2">
                <input type="text" class="w-96 h-10 rounded-[4px] border-gray-200" />
                <button class="bg-[#3873C1] text-white py-2 px-4 rounded-[4px]">ค้นหา</button>
            </div>
            <div class="font-bold">ผลการตรวจบทความ</div>

            <div class="relative inline-block ">
                <button
                    class="w-96 h-12 rounded-[4px] border-2 border-gray-200 text-gray-800 font-semibold py-2 px-4 inline-flex items-center justify-between">
                    <span>ไม่ผ่าน (แก้ไข)</span>
                    <svg class="fill-current h-4 w-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M10 12l-6-6 1.41-1.41L10 9.17l4.59-4.58L16 6z" />
                    </svg>
                </button>

                <div class="absolute hidden bg-white text-gray-700 py-2 mt-1 rounded-[4px] shadow-lg">
                    <a href="#" class="block px-4 py-2 text-sm">Option 1</a>
                    <a href="#" class="block px-4 py-2 text-sm">Option 2</a>
                    <a href="#" class="block px-4 py-2 text-sm">Option 3</a>
                </div>
                <div class="space-x-2 mt-[32px]">
                    <button
                        class="py-2 px-4 bg-[#BABCBF] text-white text-sm rounded-[4px]">ย้อนกลับ</button>
                    <button
                        class="py-2 px-4 bg-[#0A7373] text-white text-sm rounded-[4px]">บันทึก</button>

                </div>

            </div>


        </div>
    </div>
</template>
