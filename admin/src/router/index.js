import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '../views/sigin/login.vue'
import home from '../views/home.vue'
import index from '../views/index/index.vue'

import reditor from '../views/role/editor.vue'
import rlist from '../views/role/list.vue'
import rgroup from '../views/role/group.vue'
import radmin from '../views/role/admin.vue'

import pgroup from '../views/permis/group.vue'
import puser from '../views/permis/user.vue'

import btype from '../views/book/type.vue'
import bother from '../views/book/other.vue'

import sperformance from '../views/system/performance.vue'
import sother from '../views/system/other.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/login",
  },
  {
    path: '/login',
    name: 'login',
    meta: { isPublic: true },
    component: login
  },
  {
    path: '/home',
    name: '首页',
    meta: { title: '首页' },
    redirect: "/index",
    component: home,
    children: [
      {
        path: '/index',
        name: '首页',
        meta: { title: '首页' },
        component: index
      },
    ]
  },

  {
    path: '/role',
    name: '角色管理',
    meta: { title: '角色管理' },
    redirect: "/role/list",
    component: home,
    children: [
      {
        path: '/role/editor',
        name: '编辑用户',
        component: reditor,
      },
      {
        path: '/role/editor/:id',
        name: '编辑用户',
        component: reditor,
        props: true,
      },
      {
        path: '/role/list',
        name: '用户列表',
        component: rlist,
      },
      {
        path: '/role/group',
        name: '用户组',
        component: rgroup,
      },
      {
        path: '/role/admin',
        name: '管理员',
        component: radmin,
      },
    ]
  },

  {
    path: '/permis',
    name: '权限管理',
    redirect: "/permis/group",
    component: home,
    children: [
      {
        path: '/permis/group',
        name: '组权限',
        component: pgroup,
      },
      {
        path: '/permis/user',
        name: '用户权限',
        component: puser,
      },
    ]
  },

  {
    path: '/book',
    name: '书籍管理',
    redirect: "/book/type",
    component: home,
    children: [
      {
        path: '/book/type',
        name: '分类管理',
        component: btype,
      },
      {
        path: '/book/other',
        name: '其他',
        component: bother,
      },
    ]
  },

  {
    path: '/system',
    name: '系统管理',
    redirect: "/system/performance",
    component: home,
    children: [
      {
        path: '/system/performance',
        name: '性能监控',
        component: sperformance,
      },
      {
        path: '/system/other',
        name: '其他',
        component: sother,
      },
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  routes
})

// 路由拦截
router.beforeEach(async (to, from, next) => {
  if (!to.meta.isPublic && sessionStorage.token) {
    await Vue.prototype.$http.post("istoken", { token: sessionStorage.token });
  } else if (!to.meta.isPublic && !sessionStorage.token) {
    if (!to.meta.isPublic) {
      Vue.prototype.$message({
        type: 'error',
        message: '请先登陆！'
      })
    }
    next('/')
  }
  next()
})

export default router
