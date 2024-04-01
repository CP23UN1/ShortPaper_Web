import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import Login from '../views/Login.vue'

// Student Role
import StudentArticle from '../views/StudentRole/StudentArticle.vue'
import StudentDetails from '../views/StudentRole/StudentDetails.vue'
import StudentFileDetails from '../views/StudentRole/StudentFileDetails.vue'
import StudentEditForm from '../views/StudentRole/StudentEditForm.vue'
import StudentFileList from '../views/StudentRole/StudentFileList.vue'
import StudentFileUploading from '../views/StudentRole/StudentFileUploading.vue'
import StudentHome from '../views/StudentRole/StudentHome.vue'
import StudentNewForm from '../views/StudentRole/StudentNewForm.vue'

// Admin Role
import AdminAddStudentData from '../views/AdminRole/AdminAddStudentData.vue'
import AdminAnnouncementList from '../views/AdminRole/AdminAnnouncementList.vue'
import AdminAssignAdvisor from '../views/AdminRole/AdminAssignAdvisor.vue'
import AdminCreateAnnouncement from '../views/AdminRole/AdminCreateAnnouncement.vue'
import AdminStudentDetails from '../views/AdminRole/AdminStudentDetails.vue'
import AdminStudentList from '../views/AdminRole/AdminStudentList.vue'

// Committee Role
import CommitteeEdit from '../views/CommitteeRole/CommitteeEdit.vue'
import CommitteeFileDetails from '../views/CommitteeRole/CommitteeFileDetails.vue'
import CommitteeFileList from '../views/CommitteeRole/CommitteeFileList.vue'
import CommitteeHome from '../views/CommitteeRole/CommitteeHome.vue'
import CommitteeList from '../views/CommitteeRole/CommitteeList.vue'
import CommitteeStudentList from '../views/CommitteeRole/CommitteeStudentList.vue'
import CommitteeStudentDetails from '../views/CommitteeRole/CommitteeStudentDetails.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  // Student Role
  {
    path: '/article',
    name: 'Article',
    component: StudentArticle,
    meta: { requiresAuth: true, requiresRole: 'student' },
  },
  {
    path: '/details',
    name: 'Student information',
    component: StudentDetails,
    meta: { requiresAuth: true, requiresRole: 'student' },
  },
  {
    path: '/file/:fileTypeId/:shortpaperId',
    name: 'ShortPaper File Details',
    component: StudentFileDetails,
    meta: { requiresAuth: true, requiresRole: 'student' },
  },
  {
    path: '/edit',
    name: 'Editing student information',
    component: StudentEditForm,
    meta: { requiresAuth: true, requiresRole: 'student' },
  },
  {
    path: '/files',
    name: 'ShortPaper File',
    component: StudentFileList,
    meta: { requiresAuth: true, requiresRole: 'student' },
  },
  {
    path: '/upload/:typeId',
    name: 'Uploading ShortPaper',
    component: StudentFileUploading,
    meta: { requiresAuth: true, requiresRole: 'student' },
  },
  {
    path: '/',
    name: 'Home Student',
    component: StudentHome,
    meta: { requiresAuth: true, requiresRole: 'student' },
  },
  {
    path: '/new',
    name: 'New Student',
    component: StudentNewForm,
    meta: { requiresAuth: true, requiresRole: 'student' },
  },
  // Admin Role
  {
    path: '/admin/adddata',
    name: 'Admin Add Data',
    component: AdminAddStudentData,
    meta: { requiresAuth: true, requiresRole: 'admin' },
  },
  {
    path: '/admin/announcements',
    name: 'Admin Announcement List',
    component: AdminAnnouncementList,
    meta: { requiresAuth: true, requiresRole: 'admin' },
  },
  {
    path: '/admin/assign',
    name: 'Assigning Advisor',
    component: AdminAssignAdvisor,
    meta: { requiresAuth: true, requiresRole: 'admin' },
  },
  {
    path: '/admin/create/announcement',
    name: 'Creating Announcement',
    component: AdminCreateAnnouncement,
    meta: { requiresAuth: true, requiresRole: 'admin' },
  },
  {
    path: '/admin/student/:id',
    name: 'Admin Student Detail',
    component: AdminStudentDetails,
    meta: { requiresAuth: true, requiresRole: 'admin' },
  },
  {
    path: '/admin/students',
    name: 'Admin Student List',
    component: AdminStudentList,
    meta: { requiresAuth: true, requiresRole: 'admin' },
  },
  // Committee Role
  {
    path: '/committee/edit',
    name: 'Editing Committees',
    component: CommitteeEdit,
    meta: { requiresAuth: true, requiresRole: 'committee' },
  },
  {
    path: '/committee/file/:studentId/:fileTypeId/:shortpaperId',

    name: 'Committee File Details',
    component: CommitteeFileDetails,
    meta: { requiresAuth: true, requiresRole: 'committee' },
  },
  {
    path: '/committee/files',
    name: 'Committee Student File',
    component: CommitteeFileList,
    meta: { requiresAuth: true, requiresRole: 'committee' },
  },
  {
    path: '/committee/home',
    name: 'Home Committee',
    component: CommitteeHome,
    meta: { requiresAuth: true, requiresRole: 'committee' },
  },
  {
    path: '/committees',
    name: 'Committees',
    component: CommitteeList,
    meta: { requiresAuth: true, requiresRole: 'committee' },
  },
  {
    path: '/committee/students',
    name: 'Committee Student List',
    component: CommitteeStudentList,
    meta: { requiresAuth: true, requiresRole: 'committee' },
  },
  {
    path: '/committee/student/:id',
    name: 'Committee Student Detail',
    component: CommitteeStudentDetails,
    meta: { requiresAuth: true, requiresRole: 'committee' },
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
  const store = useAuthStore()

  if (to.meta && to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else if (
    to.meta &&
    to.meta.requiresAuth &&
    isLoggedIn &&
    to.path === '/login'
  ) {
    next('/')
  } else {
    if (to.meta && to.meta.requiresRole) {
      const role = store.userRole

      if (role !== to.meta.requiresRole) {
        next(false)
      }
    }
    next()
  }
})

export default router
