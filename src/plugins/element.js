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
  Tooltip,
  Table,
  TableColumn,
  Popover,
  CheckboxGroup,
  Checkbox,
  Pagination,
  Tabs,
  TabPane,
  Dialog,
  Tree,
  MessageBox,
  Select,
  Option,
  OptionGroup,
  Row,
  Col,
  Card,
  Notification,
  Progress,
  Timeline,
  TimelineItem,
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
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Popover)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Pagination)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Dialog)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Progress)
Vue.use(Timeline)
Vue.use(TimelineItem)
Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$notify = Notification

