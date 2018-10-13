<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                 <ProductZoomer :base-images="images" :base-zoomer-options="zoomerOptions"/>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsInfo.title}}</h1>
                                <p class="subtitle">{{goodsInfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsInfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsInfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsInfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                               <el-input-number v-model="num" :min="1" :max="goodsInfo.stock_quantity" :step="1"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsInfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button  class="buy">立即购买</button>
                                                <button @click="addCart" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <!-- 吸顶效果 -->
                        <Affix :offset-top="0" @on-change="navFixed" >
                            <div id="tabHead" class="tab-head" style="position: static;  top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a href="javascript:;" @click="tabIndex=0" :class="{selected:tabIndex==0}">商品介绍</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;"  @click="tabIndex=1" :class="{selected:tabIndex==1}">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                        </Affix>
                            <div class="tab-content entry" v-show="tabIndex==0" v-html="goodsInfo.content">
                            </div>
                            <div class="tab-content"  v-show="tabIndex==1">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！" v-model="textContent" v-on:keyup.enter="setComment"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit" @click="setComment">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="comments.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="com in comments" :key="com.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>匿名用户</span>
                                                    <span>{{com.add_time | newTime}}</span>
                                                </div>
                                                <p>{{com.content}}</p>
                                            </div>
                                        </li>
                                       
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                             <Page :total="40" :current="indexPage" placement="top" @on-page-size-change="sizeChange" :page-size="pageSize"  @on-change="getPageNum" show-elevator show-sizer />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <!-- 商品推荐数据展示 -->
                                    <li v-for="item in Recommended" :key="item.id">
                                        <div class="img-box">
                                            <!-- 点击重新更新id -->
                                            <router-link :to="'/detail/'+item.id">
                                                <img v-lazy="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/90" class="">{{item.title}}</a>
                                            <span>{{ item.add_time | newTime }}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "Detail",
  data: function() {
    return {
      num: 1, //默认数量,
      goodId: [], //商品id
      goodsInfo: "", //商品信息
      Recommended: [], //推荐商品信息
      imgList: [], //图片列表
      tabIndex: 1, //标记tab栏显示哪一个,默认为商品介绍
      comments: [], //商品评论
      indexPage: 1, //当前页
      pageSize: 10, //每页显示的评论数,默认为10
      pageAll: 6, //总页数
      textContent: "", //提交评论内容
      images: {
        normal_size: [
          {
            id: 1,
            url:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539361155360&di=e4cb1d4cadb88e2bedc74926ede8a9c7&imgtype=jpg&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170522%2F97727408c9b743b9bcec4e4bcc30a293.png"
          },
          {
            id: 2,
            url:
              "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3144814469,4216142532&fm=26&gp=0.jpg"
          }
        ]
      },
      zoomerOptions: {
        zoomFactor: 4,
        pane: "container-round",
        hoverDelay: 300,
        namespace: "inline-zoomer",
        move_by_click: true,
        scroll_items: 5,
        choosed_thumb_border_color: "#bbdefb"
      }
    };
  },
  methods: {
    getGoodInfo() {
      //获取url传递过来的商品id
      this.goodId = this.$route.params.goodId;

      this.$axios.get("/site/goods/getgoodsinfo/" + this.goodId).then(data => {
        this.goodsInfo = data.data.message.goodsinfo;
        this.Recommended = data.data.message.hotgoodslist;
        this.imgList = data.data.message.imgList;
        //  console.log(this.goodsInfo);
      });
    },
    //获取评论内容
    getComment() {
      this.$axios
        .get(
          `http://111.230.232.110:8899/site/comment/getbypage/goods/88?pageIndex=${
            this.indexPage
          }&pageSize=${this.pageSize}`
        )
        .then(data => {
          this.comments = data.data.message;
          this.commentsLength = data.data.message.length;
          this.pageAll = this.comments.length / this.everyPageNum;
        });
    },
    //    设置页码,页数改变的时候会获得页码value
    getPageNum(value) {
      //设置当前页
      this.indexPage = value;
      this.getComment();
    },
    sizeChange(pageSizeVal) {
      this.pageSize = pageSizeVal;
      this.pageIndex = 1;
      this.getComment();
    },
    //点击提交评论
    setComment() {
      this.$axios.post("site/validate/comment/post/goods/" + this.goodId,{
        commenttxt: this.textContent
      }).then((rep)=>{
          //清空评论框
      this.textContent = "";
      //重新获取评论
      this.getComment();
      });
      
    },
    //加入购物车功能
    addCart(){
        //修改仓库数据
        this.$store.commit("addCart",{
            id:this.goodId,
            buyCount:this.num
        })
        //num变会1
        this.num=1;
    },
    //吸顶的时候改变触发
    navFixed(val){
          console.log(val)
    }
  },
  created() {
    //获取具体商品信fhjskdfhkhfkshjk息
    this.getGoodInfo();
    //获取评论信息
    this.getComment();
    
  },
  //监听数据变化
  watch: {
    $route(to, from) {
      this.goodId = to.params.goodId;
      // 重新获取数据
      this.getGoodInfo();
      // 重新获取评论
        this.getComment();
      // 把购买数量修改为1即可
      this.num = 1;
    }
  }
};
</script>

<style>
.tab-content img {
  display: block;
  width: 100%;
  margin: 0 auto;
}

.inline-zoomer-hahaha-zoomer-box {
  height: 300px;
}
.preview-box img {
  width: 380px;
  height: 250px;
}
.control-box {
  height: 50px;
}
.control {
  margin: 0 auto;
}
.control-box > div {
  float: left;
  height: 50px;
}
.control-box .thumb-list img {
  width: 80px;
  height: 50px;
  float: left;
}
</style>
