import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

const moduleFiles = require.context('./modules', true, /\.js$/)

const modules = moduleFiles.keys().reduce((moduleMap, modulePath) => {
  // 正则过滤参数，拿到模块文件命名
  const name = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  // 执行导入拿到模块对象
  const value = moduleFiles(modulePath)
  moduleMap[name] = value.default
  return moduleMap
}, {})

const store = new Vuex.Store({
  modules,
  getters,
})

if (process.env.NODE_ENV === 'development' && module.hot) {
  const paths = moduleFiles.keys()
  module.hot.accept(paths, () => {
    store.hotUpdate({
      modules: modules,
    })
  })
}

export default store
