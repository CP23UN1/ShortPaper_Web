import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Home from '../views/Home.vue'
import StudentList from '../views/User/StudentList.vue'
import StudentEditForm from '../views/User/StudentEditForm.vue'
import Announcement from '../views/Announcement.vue'
import StudentInformation from '../views/User/StudentInformation.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/studentlist',
      name: 'studentlist',
      component: StudentList
    },
    {
      path: '/editstudent',
      name: 'editstudent',
      component: StudentEditForm
    },
    {
      path: '/announcement',
      name: 'announcement',
      component: Announcement
    },
    {
      path: '/studentinfo',
      name: 'studentinformation',
      component: StudentInformation
    }
  ]
})

export default router
