/**
 * 路由守卫权限控制
 * @author ouyang
*/

import Nprogress from 'nprogress'
import { Message } from 'element-ui'
import router from './routes'
import store from './store'
import { getPageTitle } from './utils/view'
import { getToken } from './utils/user'

Nprogress.configure({ showSpinner: false })

// 路由白名单
const whiteList = [
  '/login',
]

router.beforeEach(async(to, form, next) => {
  Nprogress.start()

  document.title = getPageTitle(to.meta.title)

  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      Nprogress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        console.log('123123')
        // try {
        //   const { roles } = await store.dispatch('user/getInfo')
        //   const authorizeRoutes = await store.dispatch('permission/generatorRoutes', roles)
        //   router.addRoutes(authorizeRoutes)
        //   next({ ...to, replace: true })
        // } catch (e) {
        //   await store.dispatch('user/resetToken')
        //   Message.error(e || 'Has Error')
        //   next(`/login?redirect=${to.path}`)
        //   Nprogress.done()
        // }
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      Nprogress.done()
    }
  }
})

router.afterEach(() => {
  Nprogress.done()
})
