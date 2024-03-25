import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Others
import Login from '../views/Login.vue'

// Student Role
import StudentArticle from '../views/studentRole/StudentArticle.vue'
import StudentDetails from '../views/studentRole/StudentDetails.vue'
import StudentEditForm from '../views/studentRole/StudentEditForm.vue'
import StudentFileList from '../views/studentRole/StudentFileList.vue'
import StudentFileUploading from '../views/studentRole/StudentFileUploading.vue'
import StudentHome from '../views/studentRole/StudentHome.vue'

// Admin Role
import AdminAddStudentData from '../views/AdminRole/AdminAddStudentData.vue'
import AdminAnnouncementList from '../views/AdminRole/AdminAnnouncementList.vue'
import AdminAssignAdvisorToStudent from '../views/AdminRole/AdminAssignAdvisorToStudent.vue'
import AdminCreateAnnouncement from '../views/AdminRole/AdminCreateAnnouncement.vue'
import AdminHome from '../views/AdminRole/AdminHome.vue'
import AdminStudentList from '../views/AdminRole/AdminStudentList.vue'

// Committee Role
import CommitteeEdit from '../views/CommitteeRole/CommitteeEdit.vue'
import CommitteeFileDetails from '../views/CommitteeRole/CommitteeFileDetails.vue'
import CommitteeFileList from '../views/CommitteeRole/CommitteeFileList.vue'
import CommitteeList from '../views/CommitteeRole/CommitteeList.vue'
import CommitteeStudentList from '../views/CommitteeRole/CommitteeStudentList.vue'

// not organized role
import FileComment from '../views/FileComment.vue'
import ShortPaperList from '../views/ShortPaperList.vue'
import ShortPaperEdit from '../views/ShortpaperEdit.vue'

const routes = [
  // Other
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  // Student Role
  {
    path: '/student/article',
    name: 'Article',
    component: StudentArticle,
  },
  {
    path: '/student/:id',
    name: 'Student information',
    component: StudentDetails,
    meta: { requiresAuth: true, requiresStudentId: true },
  },
  {
    path: '/student/edit/:id',
    name: 'Editing student information',
    component: StudentEditForm,
    meta: { requiresAuth: true, requiresStudentId: true },
  },
  {
    path: '/files/:id',
    name: 'ShortPaper File',
    component: StudentFileList,
  },
  {
    path: '/upload/:typeId/:shortpaperId',
    name: 'Uploading ShortPaper',
    component: StudentFileUploading,
  },
  {
    path: '/',
    name: 'Home Student',
    component: StudentHome,
  },

  // Admin
  {
    path: '/admin/adddata',
    name: 'AddStudentData',
    component: AdminAddStudentData,
  },
  {
    path: '/admin/announcements',
    name: 'AnnouncementList',
    component: AdminAnnouncementList,
  },
  {
    path: '/admin/assign',
    name: 'AssignAdvisor',
    component: AdminAssignAdvisorToStudent,
  },
  {
    path: '/admin/create/announcement',
    name: 'CreateAnnouncement',
    component: AdminCreateAnnouncement,
  },
  {
    path: '/admin/home',
    name: 'Admin Home',
    component: AdminHome,
  },
  {
    path: '/admin/students',
    name: 'Student List',
    component: AdminStudentList,
  },

  // Committee
  {
    path: '/committee/edit',
    name: 'Editing Committees',
    component: CommitteeEdit,
  },
  {
    path: '/committee/filedetails',
    name: 'file',
    component: CommitteeFileDetails,
  },
  {
    path: '/committee/filelist',
    name: 'FileAdvisorList',
    component: CommitteeFileList,
  },
  {
    path: '/committees',
    name: 'Committees',
    component: CommitteeList,
  },
  {
    path: '/committee/studentlist',
    name: 'Committee Student List',
    component: CommitteeStudentList,
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
