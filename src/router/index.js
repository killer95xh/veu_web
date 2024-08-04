import { createRouter, createWebHistory } from "vue-router";

import Login from '../views/Login.vue'
import ResetPassword from '../views/ResetPassword.vue'
import Home from '../views/Home.vue'
import Task from '../views/Task.vue'
import EmployeeManager from '../views/EmployeeManager.vue'
import AddNewEmployeeManager from '../views/AddnewEmployeeManager.vue'
import EditEmployeeManager from '../views/EditEmployeeManager.vue'
import CusTomCare from '../views/CusTomCare.vue'
import FinancialManagement from '../views/FinancialManagement.vue'
import TaskDetail from '../views/TaskDetail.vue'
import ThongKe from '../views/ThongKe.vue'
import Test from '../views/Test.vue'
import PageNotFound from '../views/PageNotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: { name: "Task" },
    beforeEnter() {
      let token = localStorage.getItem('token') ? localStorage.getItem('token') : null
      if (!token) {
        return 'login'
      }
    },
    children: [
      {
        path: "/task",
        name: "Task",
        component: Task
      },
      {
        path: "/task/:task_id/:sub_task_id?/:key?",
        name: "TaskDetail",
        component: TaskDetail
      },
      {
        path: "/employee-manager",
        name: "EmployeeManager",
        component: EmployeeManager,
        beforeEnter() {
          if (localStorage.getItem('is_admin') != "1") {
            return '/'
          }
        }
      },
      {
        path: "/add-new-employee",
        name: "AddNewEmployeeManager",
        component: AddNewEmployeeManager,
        beforeEnter() {
          if (localStorage.getItem('is_admin') != "1") {
            return '/'
          }
        }
      },
      {
        path: "/edit-employee/:userId",
        name: "EditEmployeeManager",
        component: EditEmployeeManager,
        beforeEnter() {
          if (localStorage.getItem('is_admin') != "1") {
            return '/'
          }
        }
      },
      {
        path: "/custom-care",
        name: "CusTomCare",
        component: CusTomCare
      },
      {
        path: "/financial-management",
        name: "FinancialManagement",
        component: FinancialManagement
      }
    ]
  },
  {
    path: '/login',
    name: "Login",
    component: Login,
    beforeEnter() {
      let token = localStorage.getItem('token') ? localStorage.getItem('token') : null
      if (token) {
        return '/'
      }
    }
  },
  {
    path: '/reset-password',
    name: "ResetPassword",
    component: ResetPassword,
    beforeEnter() {
      let token = localStorage.getItem('token') ? localStorage.getItem('token') : null
      if (token) {
        return '/'
      }
    }
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/:pathMatch(.*)*',
    name: "PageNotFound",
    component: PageNotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router