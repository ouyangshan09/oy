/**
 * App公共状态仓库
 * @author ouyang
*/

const state = {
  sidebar: {
    opened: !localStorage.getItem('sidebarState'),
    withoutAnimation: false,
  },
  device: 'desktop',
  size: 'medium',
}

const mutations = {
  TOGGLE_SIDEBAR: (state) => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      localStorage.setItem('sidebarState', true)
    } else {
      localStorage.setItem('sidebarState', false)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    localStorage.setItem('sidebarState', false)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
}

const actions = {
  toggleSidebar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSidebar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
}

export default {
  state,
  mutations,
  actions,
  namespaced: true,
}
