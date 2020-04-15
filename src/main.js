import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import './icons'
import './plugins/element.js'
import './polyfill'
import 'normalize.css/normalize.css'

Vue.config.productionTip = false

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
