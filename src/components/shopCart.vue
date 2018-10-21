<template>
<div>
  <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <!-- 如果购物车为空则显示 -->
                                <tr v-show="$store.state.shopCart.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <!-- 显示购物车清单 -->
                                <tr v-show="$store.state.shopCart.length!=0" v-for="item in shopList" :key="item.id">
                                    <td>
                                        <el-switch  v-model="item.selected" active-color="#13ce66" inactive-color="#ff4949">
                                        </el-switch>
                                    </td>
                                    <td>
                                      <img :src="item.img_url" alt="" style="width: 65px;">
                                    </td>
                                    <td>
                                    {{item.title}}
                                    </td>
                                    <td>{{item.sell_price}}</td>
                                    <td>
                                        <el-input-number v-model="item.buycount" @change="saveShopCart(item.id,$event)" :min="1" :step="1"></el-input-number>
                                    </td>
                                    <td>{{item.sell_price*item.buycount}}</td>
                                    <td>
                                        <button type="button" @click="delCart(item.id)" class="el-button el-button--danger is-circle"><i class="el-icon-delete"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{countNum}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{sellPeiceAll}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" o>继续购物</button>
                            <!-- <router-link to="/checkOrder" > -->
                            <button class="submit" @click="isLogin">立即结算</button>
                            <!-- </router-link> -->
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
  name: "shopCart",
  data: function() {
    return {
      shopList: [] //购物车列表
    };
  },
  methods: {
    getShopCart() {
      //保存id
      let goodId = "";
      //遍历key,获取所有id
      for (const key in this.$store.state.shopCart) {
        goodId += key;
        goodId += ",";
      }
      //截取最后一个逗号
      goodId = goodId.slice(0, -1);
      //发送请求
      this.$axios.get(`site/comment/getshopcargoods/${goodId}`).then(rep => {
        //    console.log(rep);
        //遍历仓库数据,然后赋值
        rep.data.message.forEach((v, index) => {
          v.buycount = this.$store.state.shopCart[v.id];
          // console.log(this.$store.state.shopCart[v.id]);
          this.$set(v, "selected", true);
          // v.selected = true;
        });
        //存储购物车数据
        this.shopList = rep.data.message;

        //    console.log(this.shopList);
      });
    },
    //同步数据到仓库
    saveShopCart(id, newCount) {
      //   console.log(id,newCount)
      //必须用commit配合全局mutations才能同步仓库数据
      this.$store.commit("upDateShopCart", {
        id,
        newCount
      });
    },
    //删除购物车商品
    delCart(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });

          //同步数据,把仓库中的数据也删除
          this.$store.commit("delShopCart", id);
          //遍历数据,如果id相等则删除
          this.shopList.forEach((v, index) => {
            if (v.id == id) {
              this.shopList.splice(index, 1);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //判断是否登陆
    isLogin() {
      // console.log(this.shopList);
      //判断是否是已经选中的商品,进行结账
      let ids = "";
      this.shopList.forEach((v, index) => {
        if (v.selected == true) {
          ids += v.id + ",";
        }
      });
      //截取id
      ids = ids.slice(0, -1);
      //把id截取为一个数组
    //   let idArr=ids.split(",");
      if (this.$store.state.isLogin == false) {
        this.$router.push("/login");
      } else {
        this.$router.push("/checkOrder/" + ids);
      }
    },
    
  },
  computed: {
    countNum() {
      let Num = 0;
      this.shopList.forEach(v => {
        Num += v.buycount;
      });
      return Num;
    },
    sellPeiceAll() {
      let price = 0;
      this.shopList.forEach(v => {
        price += v.sell_price * v.buycount;
      });
      return price;
    }
  },
  created() {
    this.getShopCart();
  }
};
</script>
