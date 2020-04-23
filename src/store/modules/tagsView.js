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
  },
  DEL_VISITED_VIEW: (state, payload) => {
    state.visitedViews = state.visitedViews.filter(view => view.path !== payload.path)
  },
  DEL_CACHE_VIEW: (state, payload) => {
    state.cacheViews = state.cacheViews.filter(name => name !== payload.name)
  },
  DEL_OTHER_VISITED_VIEWS: (state, payload) => {
    state.visitedViews = state.visitedViews.filter(view => {
      return view.meta.affix || view.path === payload.path
    })
  },
  DEL_OTHER_CACHE_VIEWS: (state, payload) => {
    state.cacheViews = state.cacheViews.filter(name => name === payload.name)
  },
  DEL_ALL_VISITED_VIEWS: (state) => {
    state.visitedViews = state.visitedViews.filter(tag => tag.meta.affix)
  },
  DEL_ALL_CACHE_VIEWS: (state) => {
    state.cacheViews = []
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
  deleteView({ dispatch, state }, payload) {
    return new Promise(resolve => {
      dispatch('deleteVisitedView', payload)
      dispatch('deleteCacheView', payload)
      resolve({
        visitedViews: [...state.visitedViews],
        cacheViews: [...state.cacheViews],
      })
    })
  },
  deleteOthersView({ dispatch, state }, payload) {
    return new Promise(resolve => {
      dispatch('deleteOtherVisitedView', payload)
      dispatch('deleteOtherCacheView', payload)
      resolve({
        visitedViews: [...state.visitedViews],
        cacheViews: [...state.cacheViews],
      })
    })
  },
  deleteAllView({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_VISITED_VIEWS')
      commit('DEL_ALL_CACHE_VIEWS')
      resolve({
        visitedViews: [...state.visitedViews],
        cacheViews: [...state.cacheViews],
      })
    })
  },
  deleteOtherVisitedView({ commit, state }, payload) {
    return new Promise(resolve => {
      commit('DEL_OTHER_VISITED_VIEWS', payload)
      resolve([...state.visitedViews])
    })
  },
  deleteOtherCacheView({ commit, state }, payload) {
    return new Promise(resolve => {
      commit('DEL_OTHER_CACHE_VIEWS', payload)
      resolve([...state.cacheViews])
    })
  },
  deleteVisitedView({ commit, state }, payload) {
    return new Promise(resolve => {
      commit('DEL_VISITED_VIEW', payload)
      resolve([...state.visitedViews])
    })
  },
  deleteCacheView({ commit, state }, payload) {
    return new Promise(resolve => {
      commit('DEL_CACHE_VIEW', payload)
      resolve([...state.cacheViews])
    })
  }
}

export default {
  state: state,
  mutations: mutations,
  actions: actions,
  namespaced: true,
}
