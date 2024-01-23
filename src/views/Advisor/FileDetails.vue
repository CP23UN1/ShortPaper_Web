<script></script>
<template>
    <div class="grid grid-cols-2 mt-16 ">
        <div class="bg-white shadow-md p-2 text-sm h-fit w-10/12 space-y-4">
            <div>ข้อมูลนักศึกษา</div>
            <hr />
            <div>รหัสนักศึกษา</div>
            <div>ชื่อ นามสกุล</div>
            <div>ชื่อหัวข้อโครงงาน</div>
            <div>รายวิชาจัดทำ IS</div>
        </div>
        <div class="bg-white shadow-md p-2 text-sm text-gray-500 text-center h-full flex items-center justify-center">
            filepreview
        </div>
        <div class="bg-white shadow-md p-2 text-sm h-fit w-10/12 space-y-4 mt-4">
            <div>แสดงความคิดเห็น</div>
            <hr />
            <form>
                <textarea type="text" class="w-full rounded-sm border-gray-200 h-24" placeholder=""></textarea>
            </form>
        </div>
        <div class="bg-white shadow-md p-2 text-sm h-fit space-y-4 mt-4">
            <div>แบบไฟล์แสดงความคิดเห็น</div>
        </div>
        <div class="bg-white shadow-md p-2 text-sm h-fit w-10/12 mt-4 grid grid-cols-2">
            <div>เอกสารบทความ</div>
            <div class="underline text-blue-500 text-right">View</div>
            <div class="mt-4">เอกสารฉบับแก้ไขครั้งที่ 1</div>
            <div class="text-right mt-4">No Data</div>
            <div class="mt-4">เอกสารฉบับแก้ไขครั้งที่ 2</div>
            <div class="text-right mt-4">No Data</div>
        </div>

    </div>
</template>