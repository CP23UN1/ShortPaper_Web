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
import FileAdvisorList from '../views/Advisor/FileAdvisorList.vue'

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
    path: '/student/:id',
    name: 'Student information',
    component: StudentDetails,
    meta: { requiresAuth: true, requiresStudentId: true },
    // beforeEnter: (to, from, next) => {
    //   const targetUserID = to.params.id
    //   const store = useAuthStore()

    //   const studentId = store.userId
    //   const role = store.userRole

    //   if (studentId == targetUserID && role == 'Student') {
    //     next()
    //   } else {
    //     next(`/student/${studentId}`)
    //   }
    // },
  },
  {
    path: '/student/edit/:id',
    name: 'Editing student information',
    component: StudentEditForm,
    meta: { requiresAuth: true, requiresStudentId: true },
    // beforeEnter: (to, from, next) => {
    //   const targetUserID = to.params.id
    //   const store = useAuthStore()

    //   const studentId = store.userId
    //   const role = store.userRole

    //   if (studentId == targetUserID && role == 'Student') {
    //     next()
    //   } else {
    //     next(`/student/edit/${studentId}`)
    //   }
    // },
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
    path: '/upload/:typeId/:shortpaperId',
    name: 'Uploading ShortPaper',
    component: FileUploading,
  },
  {
    path: '/assign/advisor',
    name: 'AssignAdvisor',
    component: AssignAdvisorToStudent,
  },
  {
    path: '/create/announcement',
    name: 'CreateAnnouncement',
    component: CreateAnnouncement,
  },
  {
    path: '/add/student',
    name: 'AddStudentData',
    component: AddStudentData,
  },
  {
    path: '/annoncements',
    name: 'AnnouncementList',
    component: AnnouncementList,
  },
  {
    path: '/article',
    name: 'Article',
    component: Article,
  },
  {
    path: '/file/advisor/list',
    name: 'FileAdvisorList',
    component: FileAdvisorList,
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
  // {
  //   path: '/file/comment',
  //   name: 'File comment',
  //   component: FileComment,
  // },
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

router.beforeEach((to, from, next) => {
  const isLoggedIn = getTokenFromCookie('token')
  const store = useAuthStore() // Retrieve the store instance

  if (to.path !== '/login' && !isLoggedIn) {
    next('/login')
  } else if (to.path === '/login' && isLoggedIn) {
    next('/')
  } else {
    // Check if the route requires authentication
    if (to.meta.requiresAuth && !isLoggedIn) {
      next('/login')
    } else {
      if (to.meta.requiresRole) {
        const role = store.userRole // Use the store instance

        if (role !== to.meta.requiresRole) {
          next('/')
        } else {
          // Check if the route requires studentId
          if (to.meta.requiresStudentId) {
            const studentId = to.params.id
            const userStudentId = store.userId // Use the store instance

            // Check if the studentId parameter in the URL matches the logged-in user's studentId
            if (studentId !== userStudentId) {
              // Redirect the user to their own studentId page
              next(`/student/${userStudentId}`)
            } else {
              next()
            }
          } else {
            next()
          }
        }
      } else {
        next()
      }
    }
  }
})

export default router
