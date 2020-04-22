import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login'
import Layout from '../layout'
import Page1 from '../views/page1'

Vue.use(Router)

/**
 * 公共路由页面
*/
export const publicRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: Page1,
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
        component: Page1,
        meta: { title: 'menu1' }
      },
      {
        path: 'menu2',
        component: Page1,
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
        component: Page1,
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
        component: Page1,
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
    component: Page1,
    hidden: true,
  },
  {
    path: '/login',
    component: Login,
    hidden: true,
  },
  {
    path: '*',
    component: Page1,
    hidden: true,
  }
]

/**
 * 授权路由页面，需要用户自生的角色来创建
*/
export const authorizeRoutes = [
  {
    path: '/permission',
    redirect: '/permission/menu',
    component: Layout,
    name: 'Permission',
    meta: {
      title: '权限',
      icon: 'lock',
      roles: ['admin'],
    },
    children: [
      {
        path: 'menu',
        component: Page1,
        name: 'MenuPermission',
        meta: {
          title: '菜单权限',
          roles: ['admin'],
        }
      }
    ],
  }
]

const createRouter = () => new Router({
  routes: publicRoutes,
  mode: 'history',
})

const router =createRouter()

/**
 * 重置路由
*/
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}


export default router
