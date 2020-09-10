// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import elementui from 'element-ui'
import axios from 'axios'
// 引入css样式
import 'element-ui/lib/theme-chalk/index.css'
import VueSession from 'vue-session'
Vue.use(VueSession)
import heyui from 'heyui'
Vue.use(heyui)
require("heyui/themes/index.css");
import "heyui/themes/index.less";
import qs from 'qs'
Vue.prototype.$qs = qs;
Vue.prototype.$axios = axios
import Echarts from 'echarts'

// 使用模块
Vue.use(elementui)
import store from './store/index'
Vue.config.productionTip = false
import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer)
Vue.prototype.$echarts = Echarts;

// 阻止启动生产消息
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
