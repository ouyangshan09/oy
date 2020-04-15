import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Loading,
  Message,
} from 'element-ui'
// import ElementUI from 'element-ui';

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message

