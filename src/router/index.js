import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../views/Home.vue'
import StudentList from '../views/Student/StudentList.vue'
import StudentEditForm from '../views/Student/StudentEditForm.vue'
import Announcement from '../views/Announcement.vue'
import StudentDetails from '../views/Student/StudentDetails.vue'
import CommitteeList from '../views/Committee/CommitteeList.vue'
import SendingFile from '../views/SendingFile.vue'
import UploadingFile from '../views/UploadingFile.vue'

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
    path: '/announcement',
    name: 'Announcement',
    component: Announcement,
  },
  {
    path: '/files',
    name: 'ShortPaper File',
    component: SendingFile,
  },
  {
    path: '/upload',
    name: 'Uploading ShortPaper',
    component: UploadingFile
  }
]

const router = createRouter({ history, routes })

export default router
