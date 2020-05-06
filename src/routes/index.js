import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login'
import Layout from '../layout'
import Page1 from '../views/page1'
import Page2 from '../views/page2'
import Redirect from '../views/redirect'
// import Home from '../views/home'

Vue.use(Router)

/**
 * 公共路由页面
*/
export const publicRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: Redirect,
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/home'),
        meta: {
          title: '首页',
          icon: 'dashboard',
          affix: true,
        }
      },
    ],
  },
  // {
  //   path: '/menus',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   meta: {
  //     title: '菜单',
  //     icon: 'lock',
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       name: 'menu1',
  //       component: Page1,
  //       meta: { title: 'menu1' }
  //     },
  //     {
  //       path: 'menu2',
  //       name: 'menu2',
  //       component: Page2,
  //       meta: { title: 'menu2' }
  //     }
  //   ],
  // },
  {
    path: '/icons',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('../views/icons'),
        name: 'Icons',
        meta: {
          title: '图标',
          icon: 'icon',
          affix: true,
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
        component: Page2,
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
    // redirect: '/permission/menu',
    redirect: 'noRedirect',
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
        component: () => import('../views/permission'),
        name: 'MenuPermission',
        meta: {
          title: '菜单权限',
          roles: ['admin'],
        }
      }
    ],
  },
  {
    path: '/user',
    component: Layout,
    name: 'User',
    meta: {
      title: '用户',
      icon: 'peoples',
      roles: ['admin'],
    },
    children: [
      {
        path: 'index',
        component: () => import('../views/user'),
        name: 'UserManage',
        meta: {
          title: '用户管理',
          roles: ['admin'],
        }
      }
    ]
  },
  // {
  //   path: '/table',
  //   name: 'Table',
  //   redirect: '/table/normal-table',
  //   component: Layout,
  //   meta: {
  //     title: '表格',
  //     icon: 'table',
  //   },
  //   children: [
  //     {
  //       path: 'normal-table',
  //       component: () => import('../views/table/normal-table'),
  //       name: 'NormalTable',
  //       meta: {
  //         title: '普通表格',
  //       },
  //     },
  //     {
  //       path: 'drag-table',
  //       component: () => import('../views/table/drag-table'),
  //       name: 'DragTable',
  //       meta: {
  //         title: '拖动表格',
  //       },
  //     },
  //     {
  //       path: 'inline-edit-table',
  //       component: () => import('../views/table/inline-edit-table'),
  //       name: 'InlineEditTable',
  //       meta: {
  //         title: '内联行编辑表格',
  //       },
  //     },
  //     {
  //       path: 'condition-table',
  //       component: () => import('../views/table/condition-table'),
  //       name: 'ConditionTable',
  //       meta: {
  //         title: '多条件查询表格',
  //       },
  //     }
  //   ]
  // }
]

const createRouter = () => new Router({
  routes: publicRoutes,
  mode: 'history',
})

const router = createRouter()

/**
 * 重置路由
*/
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}


export default router
