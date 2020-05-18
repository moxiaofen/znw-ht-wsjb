// 初始化入口
import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store/index.js' //把store引进来


Vue.config.devtools = true
Vue.config.productionTip = false
// 导入淘宝自适配文件
import 'lib-flexible/flexible.js'
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.min.css'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.use(MintUI);
import './css/resetVant.css'
import './css/mint.css'

import './style/mintUistyle.scss'; //核心，多了这一行用上边的样式覆盖默认的primary颜色


import Mui from "vue-awesome-mui";
Vue.use(Mui)

Vue.config.productionTip = false;
// 导入mint-ui前端框架相关组件
import {
  Picker,
  Popup,
  Indicator,
  Tabbar,
  TabItem,
  TabContainer,
  TabContainerItem,
  Button,
  Actionsheet,
  MessageBox,
  Loadmore,
  //Toast,
  Navbar,
  InfiniteScroll
} from 'mint-ui'
Vue.component(InfiniteScroll.name, InfiniteScroll);
Vue.component(Navbar.name, Navbar);
Vue.component(Picker.name, Picker);
Vue.component(Popup.name, Popup);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Button.name, Button);
Vue.component(Actionsheet.name, Actionsheet);
Vue.component(Loadmore.name, Loadmore);
Vue.prototype.$indicator = Indicator;
Vue.prototype.$dialog = MessageBox;
//Vue.prototype.$toast = Toast;
//引入另一个网络请求的方式，解决原来网络请求的方式发送base64图片崩溃的情况
import Axios from 'axios';
// 配置请求信息
var $http = Axios.create({
  timeout: '5000',  //请求超时时间5秒
})
Vue.prototype.$http = $http//挂载到Vue实例
// 绑定axios封装类到全局
import api from './api/ajax.js'
Vue.prototype.$api = api;

// 绑定常量类到全局
import Constants from './api/constants.js'
Vue.prototype.$Constants = Constants
// 绑定字符串工具类到全局
import StringUtils from './api/StringUtils.js'
Vue.prototype.$StringUtils = StringUtils

// 绑定正则校验类到全局
import ValidateUtils from './api/ValidateUtils.js'
Vue.prototype.$regx = ValidateUtils
// 绑定错误提示信息到全局
import ErrorMsg from './api/ErrorMsg.js'
Vue.prototype.$ErrorMsg = ErrorMsg
// 绑定路由管理到全局
import RouterManager from './api/RouterManager.js'
Vue.prototype.$RM = RouterManager
// 绑定全局变量到全局
import Variable from './api/Variable.js'
Vue.prototype.$variable = Variable
// 绑定sesssion全局变量到全局,全局登陆超时方法
//import storeData from './store.js';
//Vue.prototype.$storeData = storeData;
//一进入程序就将工具类加入全局变量
import utils from './api/utils.js'
Vue.prototype.$utils = utils
import SessionManager from './api/SessionManager.js'
Vue.prototype.$sessionManager = SessionManager

import Countly from './api/countly.min.js'
Vue.prototype.$Countly = Countly
import RSA from './api/wx_rsa.js'
Vue.prototype.$RSA = RSA

//错误代码提示加入全局变量
import ERRCODE from './api/errcode.js'
Vue.prototype.$ERRCODE = ERRCODE


import location from './api/location.js'
Vue.prototype.$location = location

// 使用vue读取本地json文件需要安装vue-resource插件，然后使用它的$http.get来读取json文件
import  VueResource  from 'vue-resource';
Vue.use(VueResource);

// 导入Countly埋点统计的包
// import Countly from 'countly-sdk-web/lib/countly'
// // Vue.use(Countly);
// Vue.prototype.$Countly = Countly;
const history = window.sessionStorage
//history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
Vue.mixin({
  beforeRouteLeave: function (to, from, next) {
    const toIndex = history.getItem(to.path);
    const fromIndex = history.getItem(from.path);
//根据路由判断操作是前进还是后退，并把标记值存入vuex
    if (toIndex) {
      if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
        history.setItem('UPDATE_DIRECTION', 'forward')
      } else {
        history.setItem('UPDATE_DIRECTION', 'reverse')
        history.removeItem(from.path)
      }
    } else {
      ++historyCount
      history.setItem('count', historyCount)
      to.path !== '/' && history.setItem(to.path, historyCount)
      history.setItem('UPDATE_DIRECTION', 'forward')
    }
    console.log('页面的跳转方向：' + history.getItem('UPDATE_DIRECTION'))
    if (history.getItem('UPDATE_DIRECTION') === 'reverse') {
      if (from.path === RouterManager.BusinessAccess) {
        SessionManager.clearBusinessAccess(this)
      } else if (from.path === RouterManager.Register) {
        SessionManager.clearRegister()
      } else if (from.path === RouterManager.FeedBack) {
        SessionManager.clearCheckBox(this)
      }
    }
    next()
  },
});


let _this = new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})

export default _this
