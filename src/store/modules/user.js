/**
 * 用户数据管理
 * @author ouyang
*/
import { login, getInfo } from '../../api/user'
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
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        commit('SET_ROLES', response.data)
        resolve(response.data)
      }).catch(reason => {
        reject(reason)
      })
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
