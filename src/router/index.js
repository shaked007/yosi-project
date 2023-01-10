import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChooseReport from  '../views/ChooseReport.vue'
import FormView from '../views/FormView.vue'
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
    path: '/choose-report',
    name: 'choose-report',
    component: ChooseReport
  },
  

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
