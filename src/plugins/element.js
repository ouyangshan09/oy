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
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Tooltip
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
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Tooltip)
Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message

