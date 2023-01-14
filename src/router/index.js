import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChooseReport from  '../views/ChooseReport.vue'
import FormView from '../views/FormView.vue'
import ReportView from "../views/ReportView.vue"
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/fill-report',
    name: 'fill-report',
    component: FormView
  },
  {
    path: '/reports',
    name: 'reports',
    component: ChooseReport
  }, {
    path: '/reports/:id',
    name: ':id',
    component: ReportView
  },
  

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
