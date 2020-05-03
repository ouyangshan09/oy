import Vue from 'vue'
import App from './App'
import router from './routes'
import store from './store'
import * as filter from './filter'
import 'normalize.css/normalize.css'
import './styles/index.scss'
import './icons'
import './permission'
import './plugins/element.js'
import './polyfill'

Object.keys(filter).map(key => {
  Vue.filter(key, filter[key])
})

Vue.config.productionTip = false

new Vue({
  router: router,
  store: store,
  render: h => h(App),
}).$mount('#app')
