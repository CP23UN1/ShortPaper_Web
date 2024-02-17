import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

import StudentList from '../views/Student/StudentList.vue'
import StudentEditForm from '../views/Student/StudentEditForm.vue'
import StudentDetails from '../views/Student/StudentDetails.vue'

import CommitteeList from '../views/Committee/CommitteeList.vue'

import FileList from '../views/File/FileList.vue'
import fileDetails from '../views/Advisor/FileDetails.vue'
import FileComment from '../views/File/FileComment.vue'
import FileUploading from '../views/File/FileUploading.vue'

import ShortPaperList from '../views/ShortPaperList.vue'
import ShortPaperEdit from '../views/ShortpaperEdit.vue'

import StudentListCommitee from '../views/Committee/StudentListCommittee.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
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
  {
    path: '/committees',
    name: 'Committees',
    component: CommitteeList,
  },
  {
    path: '/files',
    name: 'ShortPaper File',
    component: FileList,
  },
  {
    path: '/upload',
    name: 'Uploading ShortPaper',
    component: FileUploading,
  },
  {
    path: '/history',
    name: 'ShortPaper History',
    component: ShortPaperList,
  },
  {
    path: '/studentinfo',
    name: 'studentinfo',
    component: StudentListCommitee,
  },
  {
    path: '/file',
    name: 'file',
    component: fileDetails,
  },
  {
    path: '/shortpaper/edit',
    name: 'shortpaper edit',
    component: ShortPaperEdit,
  },
  {
    path: '/file/comment',
    name: 'File comment',
    component: FileComment,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore();
//   const isLoggedIn = authStore.isLoggedIn;

//   if (to.path !== '/login' && !isLoggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// })

export default router