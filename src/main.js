import Vue from 'vue';
import App from './App.vue';
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


// 路由相关
import VueRouter from 'vue-router';

import index from './components/index.vue';

Vue.use(VueRouter);



// 写规则
const routes = [
  // /根目录也对应到 index组件即可
  {
    path:'/',
    component:index
  },
  {
    path:'/index',
    component:index
  }
]

// 实例化路由对象
const router = new VueRouter({
  routes
})



new Vue({
  render: h => h(App),
  router
}).$mount('#app')
