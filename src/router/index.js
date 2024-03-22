
import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import HomeStudent from '../views/Home/HomeStudent.vue'
import Login from '../views/Login.vue'

import StudentList from '../views/Student/StudentList.vue'
import StudentEditForm from '../views/Student/StudentEditForm.vue'
import StudentDetails from '../views/Student/StudentDetails.vue'

import FileList from '../views/File/FileList.vue'
import fileDetails from '../views/Advisor/FileDetails.vue'
import FileComment from '../views/File/FileComment.vue'
import FileUploading from '../views/File/FileUploading.vue'

import CommitteeList from '../views/Committee/CommitteeList.vue'
import CommitteeEdit from '../views/Committee/CommitteeEdit.vue'

import Article from '../views/Article.vue'

import ShortPaperEdit from '../views/ShortpaperEdit.vue'
import StudentListCommitee from '../views/Committee/StudentListCommittee.vue'
import AssignAdvisorToStudent from '../views/Admin/AssignAdvisorToStudent.vue'
import CreateAnnouncement from '../views/Admin/CreateAnnouncement.vue'
import AddStudentData from '../views/Admin/AddStudentData.vue'
import AnnouncementList from '../views/Admin/AnnouncementList.vue'
import UploadB1File from '../views/Student/UploadB1File.vue'


const routes = [
  // Other
  {
    path: '/',
    name: 'Home Student',
    component: HomeStudent,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  // Student
  {
    path: '/students',
    name: 'Student List',
    component: StudentList,
  },
  {
    path: '/student/edit',
    name: 'Editing student information',
    component: StudentEditForm,
  },
  {
    path: '/student',
    name: 'Student information',
    component: StudentDetails,
  },
  // Committee
  {
    path: '/committees',
    name: 'Committees',
    component: CommitteeList,
  },
  {
    path: '/committees/edit',
    name: 'Editing Committees',
    component: CommitteeEdit,
  },
  // File
  {
    path: '/files',
    name: 'ShortPaper File',
    component: FileList,
  },
  {
    path: '/file',
    name: 'file',
    component: fileDetails,
  },
  {
    path: '/upload',
    name: 'Uploading ShortPaper',
    component: FileUploading,
  },
  {
    path: '/assign/advisor',
    name: 'AssignAdvisor',
    component: AssignAdvisorToStudent
  },
  {
    path: '/create/announcement',
    name: 'CreateAnnouncement',
    component: CreateAnnouncement
  },
  {
    path: '/add/student',
    name: 'AddStudentData',
    component: AddStudentData
  },
  {
    path: '/annoncements',
    name: 'AnnouncementList',
    component: AnnouncementList
  },
  {
    path: '/upload/b1',
    name: 'UploadB1File',
    component: UploadB1File
  },
  {
    path: '/article',
    name: 'Article',
    component: Article
  },
  // {
  //   path: '/history',
  //   name: 'ShortPaper History',
  //   component: ShortPaperList,
  // },
  // {
  //   path: '/studentinfo',
  //   name: 'studentinfo',
  //   component: StudentListCommitee,
  // },

  // {
  //   path: '/shortpaper/edit',
  //   name: 'shortpaper edit',
  //   component: ShortPaperEdit,
  // },
  {
    path: '/file/comment',
    name: 'File comment',
    component: FileComment,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

function getTokenFromCookie(cookieName) {
  const cookies = document.cookie.split(';')

  for (let cookie of cookies) {
    cookie = cookie.trim()

    if (cookie.startsWith(cookieName + '=')) {
      return cookie.substring(cookieName.length + 1)
    }
  }
  return null
}

// router.beforeEach((to, from, next) => {
//   const isLoggedIn = getTokenFromCookie('token')

//   if (to.path !== '/login' && !isLoggedIn) {
//     next('/login')
//   } else if (to.path === '/login' && isLoggedIn) {
//     next('/')
//   } else {
//     next()
//   }
// })

export default router