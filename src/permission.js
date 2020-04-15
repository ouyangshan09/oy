/**
 * 路由守卫权限控制
 * @author ouyang
*/

import router from './routes'
import Nprogress from 'nprogress'
import Cookie from 'js-cookie'

Nprogress.configure({ showSpinner: false })

const getToken = () => {
  return Cookie.get('token')
}

// 路由白名单
const whiteList = [
  '/login',
]

router.beforeEach(async(to, form, next) => {
  Nprogress.start()

  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      Nprogress.done()
    } else {
      next()
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
