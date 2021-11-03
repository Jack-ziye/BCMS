import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/sigin/login.vue'
import home from '../views/home/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
