import { createWebHistory, createRouter } from 'vue-router'

import homeView from './components/homeview.vue'
import aboutView from './components/aboutview.vue'
import signupview from './components/signupview.vue'
const routes = [
  { path: '/', component: homeView },
  { path: '/about', component: aboutView },
  {path:'/signup',component:signupview},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router;