import Vue from 'vue';
import App from './App.vue';
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
//修改事件格式插件
import moment from "moment";

Vue.use(ElementUI);
//把axios写进原型,方便其他方法调用
Vue.prototype.$axios=axios;
// 路由相关
import VueRouter from 'vue-router';

import index from './components/index.vue';
import detail from './components/detail.vue';
import vip from './components/vip.vue';

Vue.use(VueRouter);



// 写规则
const routes = [
  // /根目录也对应到 index组件即可
  {
    path: '/',
    component: index
  },
  {
    path: '/index',
    component: index
  },
  {
    path:"/vip",
    component:vip
  },
  {
    path:"/detail/:goodId",
    component:detail
  }
]

// 实例化路由对象
const router = new VueRouter({
  routes
})

Vue.filter("newTime",function(value){
    return moment(value).format("YYYY年MM月DD日");
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')