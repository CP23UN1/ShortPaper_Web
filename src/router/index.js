import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Home from '../views/Home.vue'
import StudentList from '../views/User/StudentList.vue'
import StudentEditForm from '../views/StudentEditForm.vue'
import Announcement from '../views/Announcement.vue'
import StudentDetails from '../views/User/StudentDetails.vue'
import CommitteeList from '../views/CommitteeList.vue'


const history = createWebHashHistory();

const routes = [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/students',
      name: 'Student List',
      component: StudentList
    },
    {
      path: '/student/edit',
      name: 'Editing student information',
      component: StudentEditForm
    },
    {
      path: '/announcement',
      name: 'Announcement',
      component: Announcement
    },
    {
      path: '/student',
      name: 'Student information',
      component: StudentDetails
    },
    {
      path: '/committees',
      name: 'Assigning committees',
      component: CommitteeList
    }
  ]

const router = createRouter({ history, routes })  

export default router
