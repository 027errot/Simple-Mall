import Vue from 'vue'
//import ElementUI from 'element-ui';
import { Button,ButtonGroup,Row,Col,Aside,Container,Header,Main,Footer,Menu,Submenu,MenuItemGroup,MenuItem,Dropdown,DropdownMenu,DropdownItem,Radio,RadioGroup,Checkbox,CheckboxGroup,Input,Autocomplete,InputNumber,Select,Option,OptionGroup,Cascader,Switch,Slider,Tooltip,TimePicker,TimeSelect,DatePicker,Upload,Dialog, Rate,Table,TableColumn,MessageBox,Form,FormItem,Alert } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'

import axios from 'axios'

//Vue.use(ElementUI);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Row);
Vue.use(Col);
Vue.use(Aside);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Input);
Vue.use(Autocomplete);
Vue.use(InputNumber);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Cascader);
Vue.use(Switch);
Vue.use(Slider);
Vue.use(Tooltip);
Vue.use(TimePicker);
Vue.use(TimeSelect);
Vue.use(DatePicker);
Vue.use(Upload);
Vue.use(Dialog);
Vue.use(Rate);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Alert);
//Vue.use(Message);

Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = MessageBox.prompt


Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
