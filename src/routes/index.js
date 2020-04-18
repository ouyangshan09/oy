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
      {
        path: 'profile',
        component: child1,
      },
      {
        path: '404',
        component: notFount,
      }
    ],
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '*',
    component: notFount,
  }
]

const router = new Router({
  routes: constantRoutes,
})

export default router
