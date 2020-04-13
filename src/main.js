import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import './plugins/element.js'
import 'normalize.css/normalize.css'

Vue.config.productionTip = false

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
