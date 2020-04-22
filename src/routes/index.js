import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login'
import Layout from '../layout'

Vue.use(Router)

const child1 = { template: '<div>child1</div>' }
const child2 = { template: '<div>child2</div>' }
const notFount = { template: '<div>404</div>' }

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: child1,
        meta: {
          title: '首页',
          icon: 'dashboard',
        }
      },
    ],
  },
  {
    path: '/menus',
    component: Layout,
    meta: {
      title: '菜单',
      icon: 'lock',
    },
    children: [
      {
        path: 'menu1',
        component: child2,
        meta: { title: 'menu1' }
      },
      {
        path: 'menu2',
        component: child1,
        meta: { title: 'menu2' }
      }
    ],
  },
  {
    path: '/icons',
    component: Layout,
    children: [
      {
        path: 'index',
        component: child1,
        name: 'Icons',
        meta: {
          title: '图标',
          icon: 'icon',
        }
      }
    ],
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: child1,
        name: 'Profile',
        meta: {
          title: '个人信息',
          icon: 'user'
        }
      }
    ]
  },
  {
    path: '/404',
    component: notFount,
    hidden: true,
  },
  {
    path: '/login',
    component: Login,
    hidden: true,
  },
  {
    path: '*',
    component: notFount,
    hidden: true,
  }
]

const router = new Router({
  routes: constantRoutes,
  mode: 'history',
})

export default router
