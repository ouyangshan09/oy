/**
 * 路由菜单权限业务数据管理
 * @author ouyang
*/
import { constantRoutes } from '../../routes'

const state = {
  routes: [].concat(constantRoutes),
  addRoutes: [],
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generatorRoutes() {
    return new Promise(resolve => {
      return resolve([])
    })
  }
}

export default {
  state,
  mutations,
  actions,
}
