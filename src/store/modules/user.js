/**
 * 用户数据管理
 * @author ouyang
*/
import { login, getInfo } from '../../api/user'
import { setToken, removeToken, getToken } from '../../utils/user'
import { resetRouter } from '../../routes'

const state = {
  token: getToken(),
  name: 'Super Admin',
  avatar: '',
  roles: [],
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
    if (token === '') {
      removeToken()
    }
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  login({ commit }, payload) {
    const { username, password } = payload
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password.trim() }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        resolve(data)
      }).catch(reason => {
        reject(reason)
      })
    })
  },
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        commit('SET_ROLES', response.data.roles)
        resolve(response.data)
      }).catch(reason => {
        reject(reason)
      })
    })
  },
  logout({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      resetRouter()
      resolve()
    })
  },
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      resolve()
    })
  }
}

export default {
  state,
  mutations,
  actions,
  namespaced: true,
}
