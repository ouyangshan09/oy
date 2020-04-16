import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Loading,
  Message,
  Menu,
  MenuItem,
  Submenu,
  MenuItemGroup,
  Scrollbar,
} from 'element-ui'
// import Scrollbar from 'element-ui/packages/scrollbar'
// import ElementUI from 'element-ui';

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(Scrollbar)
Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message

