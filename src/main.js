import Vue from 'vue';
import App from './App.vue';
import axios from "axios";
import moment from "moment"; //修改事件格式插件

//Element组件
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//vuex组件
import Vuex from 'vuex';
Vue.use(Vuex)

//引入懒加载插件
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  //注意官方没有提到要加require(),必须要添加,否则无法实现
  //加载失败时显示的图片
  error: require('./assets/statics/site/img/404.jpg'),
  //加载成功时显示的图片
  loading: require('./assets/statics/site/img/loading.gif'),
  })

// 放大镜组件
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer);

//iview组件
import iView from "iview";
import 'iview/dist/styles/iview.css';
Vue.use(iView);

//把axios写进原型,方便其他方法调用
Vue.prototype.$axios=axios;
axios.defaults.baseURL = 'http://111.230.232.110:8899'; //定义接口地址

// 路由相关
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import index from './components/index.vue';
import detail from './components/detail.vue';
import vip from './components/vip.vue';



Vue.config.productionTip = false ;

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

//必须挂载到Vue实例中
const store = new Vuex.Store({
  state: {
    shopCart:JSON.parse(window.localStorage.getItem('cartData'))||{},
  },
  mutations: {
      addCart(state,obj){
       if (state.shopCart[obj.id] == undefined) {
        // 没有 增加这个key
        // state.shopCart[obj.id] = obj.buyCount
        // 为了让Vue可以观察到这个数据的改变 我们需要使用 Vue.set进行设置
        // Vue.set(obj, 'newProp', 123)
        Vue.set(state.shopCart,obj.id,obj.buyCount);
      } else {
        // 有 累加 对象也支持 对象[属性名]
        state.shopCart[obj.id] += obj.buyCount;
      }
      }
  },
  getters:{
    cartGoodCount(state) {
      // 通过state 就可以访问到我们的数据
      // 遍历 累加
      let totalCount = 0;
      for (const key in state.shopCart) {
        totalCount += state.shopCart[key];
      }
      return totalCount;
    }
  }
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')