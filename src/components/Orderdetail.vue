<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-14">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{orderInfo.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{orderInfo.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{orderInfo.area}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{orderInfo.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{orderInfo.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                        <div class="el-col el-col-12">
                                                <dl class="form-group">
                                                    <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                                    <dd>{{orderInfo.message}}</dd>
                                                </dl>
                                            </div>
                                </div>
                            </div>
                            <div class="el-col el-col-10">
                                <!-- 支付二维码生成 -->
                                <qrcode :value="'http://111.230.232.110:8899/site/validate/pay/alipay/'+orderId" :options="{ size: 200 }"></qrcode>
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
  name: "Orderdetail",
  data() {
    return {
      orderId: "", //订单id
      orderInfo: {} ,//订单信息
      qrCode:""    //二维码地址
    };
  },
  methods: {
    getOrderInfo() {
      //获取订单id
      this.orderId = this.$route.params.orderid;
      this.$axios
        .get("site/validate/order/getorder/" + this.orderId)
        .then(rep => {
          this.orderInfo = rep.data.message[0];
        });
    },
    
  },
  created() {
    this.getOrderInfo();

    // 开启定时器 间隔获取订单信息
    this.interId = setInterval(() => {
      // 调用接口
      this.$axios
        .get("site/validate/order/getorder/" + this.orderId)
        .then(response => {
          //   console.log(response);
          // 获取订单信息
          this.orderInfo = response.data.message[0];
          // 判断订单的状态
          if (this.orderInfo.status == 2) {
            // 订单支付成功
            this.$message.success("支付成功 ^_^");
            // 跳转页面
            this.$router.push('/paySuccess');
          }
        });
    }, 1500);
  },
  // 被销毁的时候触发
  destroyed(){
    //   console.log('我被干掉了');
    clearInterval(this.interId);
  }
};
</script>

<style>
</style>
