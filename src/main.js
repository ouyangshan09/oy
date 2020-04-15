import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import 'normalize.css/normalize.css'
import './icons'
// import './permission'
import './plugins/element.js'
import './polyfill'

Vue.config.productionTip = false

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
