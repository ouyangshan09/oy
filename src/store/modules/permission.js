/**
 * 路由菜单权限业务数据管理
 * @author ouyang
*/
import { publicRoutes, authorizeRoutes } from '../../routes'

/**
 * 判断路由对象是否包含对应的角色信息
 * @param {array} roles 角色列表
 * @param {object} route 路由对象
*/
function hasPermission(roles = [], route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.role.includes(role))
  }
  return true
}

/**
 * 根据路由meta定义的角色和用户角色的对比来创建用户路由列表
 * @param {array} routes 授权路由列表
 * @param {array} roles 用户角色列表 ['admin', 'guest']
*/
export function filterAuthorizeRoutes(routes = [], roles) {
  const result = []

  routes.forEach(route => {
    const temp = { ...route }
    if (hasPermission(roles, temp)) {
      if (temp.children) {
        temp.children = filterAuthorizeRoutes(temp.children, roles)
      }
      result.push(temp)
    }
  })

  return result
}

const state = {
  routes: [].concat(publicRoutes),
  addRoutes: [],
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = publicRoutes.concat(routes)
  }
}

const actions = {
  generatorRoutes({ commit }, payload) {
    return new Promise(resolve => {
      // TODO 根据角色创建对应的菜单权限
      let routes = []
      if (payload.includes('admin')) {
        routes = authorizeRoutes || []
      } else {
        routes = filterAuthorizeRoutes(authorizeRoutes, payload)
      }
      commit('SET_ROUTES', routes)
      // console.log('authorizeRoutes:', authorizeRoutes)
      resolve(routes)
    })
  }
}

export default {
  state,
  mutations,
  actions,
  namespaced: true,
}
