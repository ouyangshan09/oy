/**
 * 路由守卫权限控制
 * @author ouyang
*/

import 'nprogress/nprogress.css'
import Nprogress from 'nprogress'
import router from './routes'
import store from './store'
import { getPageTitle } from './utils/view'
import { getToken } from './utils/user'

Nprogress.configure({ showSpinner: true })

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
        try {
          const { roles } = await store.dispatch('user/getInfo')
          const authorizeRoutes = await store.dispatch('permission/generatorRoutes', roles)
          router.addRoutes(authorizeRoutes)
          next({ ...to, replace: true })
        } catch (e) {
          await store.dispatch('user/resetToken')
          next(false)
          Nprogress.done()
        }
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

router.onError(() => {
})
