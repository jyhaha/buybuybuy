<template>
    <div>
    <!-- 导航 -->
        <div class="section">
    
            <div class="location">
    
                <span>当前位置：</span>
    
                <a href="#/" class="router-link-active">首页</a> &gt;
    
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
    
            </div>
    
        </div>
    
     <!-- 主要内容 -->
        <div class="section">
    
            <div class="wrapper">
    
                <div class="wrap-box">
    
                    <div class="left-220" style="margin: 0px;">
    
                        <div class="banner-nav">
    
                            <ul>
    
                                <li v-for="item in catelist" :key="item.id">
    
                                    <h3>
    
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="val in item.subcates" :key="val.id">{{val.title}}&nbsp;</span>
                                        </p>
                                    </h3>
    
                                    <div class="item-box">
    
                                        <dl>
    
                                            <dt>
    
                                                    <a href="/goods/40.html">{{item.title}}</a>
    
                                                </dt>
    
                                            <dd>
    
                                                <a :href="'/goods/'+val.id+'.html'" v-for="val in item.subcates" :key="val.id">{{val.title}}</a>
    
    
                                            </dd>
    
                                        </dl>
    
                                    </div>
    
                                </li>
    
                                
    
                            </ul>
    
                        </div>
    
                    </div>
    
                    <!--幻灯片-->
    
                    <div class="left-705">
    
                        <div class="banner-img">
    
                            <div id="focus-box" class="focus-box">

                            <el-carousel :interval="4000" type="card" height="341px">
                                <el-carousel-item v-for="item in sliderlist" :key="item.id">
                                     <a href="#">
                                     <img style="display:block;height:100%" :src="item.img_url" alt="">
                                        </a>
                                </el-carousel-item>
                            </el-carousel>

    
                            </div>
    
    
    
                        </div>
    
                    </div>
    
                    <!--/幻灯片-->
    
                    <div class="left-220">
    
                        <ul class="side-img-list">
    
                            <li v-for="(item,index) in toplist" :key="item.id">
    
                                <div class="img-box">
    
                                    <label>{{index+1}}</label>
    
                                    <img :src="item.img_url">
    
                                </div>
    
                                <div class="txt-box">
    
                                    <a href="/goods/show-98.html">{{item.title}}</a>
    
                                    <span>{{item.add_time | newTime}}</span>
    
                                </div>
    
                            </li>
    
                        </ul>
    
                    </div>
    
                </div>
    
            </div>
    
        </div>
    <!-- 商品 -->
        <div class="section" v-for="item in productInfo" :key="item.level1cateid">
    
            <div class="main-tit">
    
                <h2>{{item.catetitle}}</h2>
    
                <p>
    
                    <a href="/goods/43.html" v-for="productList in item.level2catelist" :key="productList.subcateid">{{productList.subcatetitle}}</a>
    
                    <!-- <a href="/goods/43.html">外设产品</a>
    
                    <a href="/goods/43.html">办公打印</a> -->
    
                    <a href="/goods/40.html">更多
    
                            <i>+</i>
    
                        </a>
    
                </p>
    
            </div>
    
            <div class="wrapper clearfix">
    
                <div class="wrap-box">
    
                    <ul class="img-list">
    
                        <li v-for="list in item.datas" :key="list.artID">
    
                            <!-- <a href="#/site/goodsinfo/92" class=""> -->
                            <router-link :to="'/detail/'+list.artID">
    
                                <div class="img-box">
    
                                    <img v-lazy="list.img_url" >
    
                                </div>
    
                                <div class="info">
    
                                    <h3>{{list.artTitle}}</h3>
    
                                    <p class="price">
    
                                        <b>{{list.sell_price}}</b>元</p>
    
                                    <p>
    
                                        <strong>库存 {{list.stock_quantity}}</strong>
    
                                        <span>市场价：
    
                                                <s>{{list.market_proce}}</s>
    
                                            </span>
    
                                    </p>
    
                                </div>
    
                            </router-link>
    
                        </li>
                    </ul>
    
                </div>
    
            </div>
    
        </div>
    
    
    </div>
</template>

<script>


export default {
  name: "index",

  data: function() {
    return {
      toplist: [], //左边侧栏
      sliderlist: [], //轮播图
      catelist: [], //右边菜单栏
      productInfo: [] //商品信息
    };
  },
  methods:{
      //获取主要内容部分的数据
     getMainInfo(){
           this.$axios.get("/site/goods/gettopdata/goods").then(rep => {
          
          this.toplist = rep.data.message.toplist; //保存左边侧栏数据
          this.sliderlist = rep.data.message.sliderlist; //保存轮播图数据
          this.catelist = rep.data.message.catelist; //保存右边侧栏数据
          // 存储商品信息数据
        //   this.productInfo = data.data.message;
        })
     },
      //获取商品信息数据
      getProductInfo(){
           this.$axios.get("/site/goods/getgoodsgroup").then(data => {
          // 存储商品信息数据
          this.productInfo = data.data.message;
        })
     },
  },
  

  created() {
       //渲染主要内容数据
        this.getMainInfo();
        //渲染商品信息数据
        this.getProductInfo();
      
  },
  
};
</script>
<style>

</style>
