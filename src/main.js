import Vue from 'vue'
import App from './App'
import router from './routes'
import store from './store'
import 'normalize.css/normalize.css'
import './styles/index.scss'
import './icons'
import './permission'
import './plugins/element.js'
import './polyfill'

Vue.config.productionTip = false

new Vue({
  router: router,
  store: store,
  render: h => h(App),
}).$mount('#app')
