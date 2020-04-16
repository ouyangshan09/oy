import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    A: {
      state: {
        name: 'ouyang'
      }
    }
  },
  getters: {},
})

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept(['./modules'], () => {
    const newModules = require('./modules').default
    store.hotUpdate({
      modules: newModules,
    })
  })
}

export default store
