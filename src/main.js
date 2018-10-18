import Vue from 'vue';
import App from './App.vue';
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
import axios from "axios";
//允许axios设置cookie
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://111.230.232.110:8899'; //定义接口地址

// 路由相关
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import index from './components/index.vue';
import detail from './components/detail.vue';
import vip from './components/vip.vue';
import shopCart from "./components/shopCart.vue";
import checkOrder from "./components/checkOrder.vue";
import login from "./components/login.vue"


Vue.config.productionTip = false;

// 写规则
const routes = [
  // /根目录也对应到 index组件即可
  {
    path: '/',
    component: index,
    meta: " 首页"
  },
  //首页
  {
    path: '/index',
    component: index,
    meta: " 首页"
  },
  //会员页
  {
    path: "/vip",
    component: vip,
    meta: "会员页"
  },
  // 商品详情页
  {
    path: "/detail/:goodId",
    component: detail,
    meta: " 商品"
  },
  //购物车
  {
    path: "/shopCart",
    component: shopCart,
    meta: "购物车"
  },
  //填写商品信息
  {
    path: "/checkOrder",
    component: checkOrder,
    meta: "填写品商信息"
  },
  //登录
  {
    path: "/login",
    component: login,
    meta: "登录"

  }
]

// 实例化路由对象
const router = new VueRouter({
  routes
})

//注册路由守卫
router.beforeEach((to, from, next) => {
  console.log(to)
  window.document.title=to.meta
  //如果路径失去checkOrder页面的,则判断是否已经登录
  if (to.path == "/checkOrder") {

    axios.get("site/account/islogin").then(rep => {
      if (rep.data.code == "logined") {
        //登录了,则执行用户操作
        next()
      } else {
        //没有登录打回登录页
        router.push("/login");
      }
    })
  } else {
    next();
  }

})

Vue.filter("newTime", function (value) {
  return moment(value).format("YYYY年MM月DD日");
})

//必须挂载到Vue实例中
const store = new Vuex.Store({
  state: {
    shopCart: JSON.parse(window.localStorage.getItem('cartData')) || {},
    isLogin: false,
  },
  mutations: {
    //添加同步购物车数据
    addCart(state, obj) {
      if (state.shopCart[obj.id] == undefined) {
        // 没有 增加这个key
        // state.shopCart[obj.id] = obj.buyCount
        // 为了让Vue可以观察到这个数据的改变 我们需要使用 Vue.set进行设置
        // Vue.set(obj, 'newProp', 123)
        Vue.set(state.shopCart, obj.id, obj.buyCount);
      } else {
        // 有 累加 对象也支持 对象[属性名]
        state.shopCart[obj.id] += obj.buyCount;
      }
    },
    //修改同步购物车数据
    upDateShopCart(state, obj) {
      // 有 累加 对象也支持 对象[属性名]
      state.shopCart[obj.id] = obj.newCount;

    },
    // 删除同步购物车数据
    delShopCart(state, id) {
      Vue.delete(state.shopCart, id)
    },
    //更新登录状态
    updateLogin(state, obj) {
      state.isLogin = obj.isLogin;
    }
  },
  getters: {
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
/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router,
  store,
  created() {
    axios.get("site/account/islogin").then(rep => {
      //页面创建完后,发送一次请求确定是否已登录
      if (rep.data.code == "logined") {
        store.commit("updateLogin", {
          isLogin: true
        })
      }
    })
  }
}).$mount('#app')

//关闭浏览器触发
window.onbeforeunload = function () {
  window.localStorage.setItem("cartData", JSON.stringify(store.state.shopCart));
}