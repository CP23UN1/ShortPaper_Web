import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../views/Home.vue'
import StudentList from '../views/Student/StudentList.vue'
import StudentEditForm from '../views/Student/StudentEditForm.vue'
import StudentDetails from '../views/Student/StudentDetails.vue'
import CommitteeList from '../views/Committee/CommitteeList.vue'
import FileList from '../views/File/FileList.vue'
import FileUploading from '../views/File/FileUploading.vue'
import ShortPaperList from '../views/ShortPaperList.vue'
import StudentListCommitee from '../views/Committee/StudentListCommittee.vue'

const history = createWebHashHistory()

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
  }
]

const router = createRouter({ history, routes })

export default router
