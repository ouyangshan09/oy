/**
 * 路由页面管理
*/

const state = {
  visitedViews: [],
  cacheViews: [],
}

const mutations = {
  ADD_VISITED_VIEW: (state, view) => {
    if (state.visitedViews.some(v => v.path === view.path)) {
      return
    }
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || view.path
      })
    )
  },
  ADD_CACHE_VIEW: (state, view) => {
    if (state.cacheViews.includes(view.name)) {
      return
    }
    if (!view.meta.noCache) {
      state.cacheViews.push(view.name)
    }
  },
  UPDATE_VISITED_VIEW: (state, view) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }
}

const actions = {
  addVisitedView({ commit }, payload) {
    return new Promise(resolve => {
      if (!Array.isArray(payload)) {
        payload = [payload]
      }
      for (const view of payload) {
        commit('ADD_VISITED_VIEW', view)
      }
      resolve()
    })
  },
  addCacheView({ commit }, payload) {
    return new Promise(resolve => {
      commit('ADD_CACHE_VIEW', payload)
      resolve()
    })
  },
  addView({ dispatch }, payload) {
    dispatch('addVisitedView', payload)
    dispatch('addCacheView', payload)
  },
  updateVisitedView({ commit }, payload) {
    commit('UPDATE_VISITED_VIEW', payload)
  },
  deleteView() {
    //
  }
}

export default {
  state: state,
  mutations: mutations,
  actions: actions,
  namespaced: true,
}
