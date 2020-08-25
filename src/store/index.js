import Vuex from 'vuex'
import user from './models/user'
import Vue from 'vue'
Vue.use(Vuex)
export default new Vuex.Store({
  //模块引入
  modules:{
    user:user
  }
})
