import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login'
import Layout from '../layout'

Vue.use(Router)

const child1 = { template: '<div>child1</div>' }
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
      },
    ],
  },
  {
    path: '/profile',
    component: Layout,
    hidden: true,
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
})

export default router
