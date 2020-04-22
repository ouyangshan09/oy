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
  generatorRoutes(store, payload) {
    return new Promise(resolve => {
      // TODO 根据角色创建对应的菜单权限
      resolve(['test1', 'test2'])
    })
  }
}

export default {
  state,
  mutations,
  actions,
  namespaced: true,
}
