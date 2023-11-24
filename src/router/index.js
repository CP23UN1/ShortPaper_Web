import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Home from '../views/Home.vue'
import StudentList from '../views/User/StudentList.vue'
import StudentEditForm from '../views/User/StudentEditForm.vue'

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
    }
  ]
})

export default router
