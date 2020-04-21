/**
 * 用户数据管理
 * @author ouyang
*/
import { login } from '../../api/user'
import { setToken } from '../../utils/user'

const state = {
  token: '',
  name: '',
  avatar: '',
  roles: [],
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
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
  getInfo() {
    return Promise.resolve({ roles: ['admin'] })
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
