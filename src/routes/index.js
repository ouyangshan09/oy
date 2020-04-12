import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Root = { template: '<div>root</div>' }

const constantRoutes = [
  {
    path: '/',
    component: Root,
  }
]

const router = new Router({
  routes: constantRoutes,
})

export default router
