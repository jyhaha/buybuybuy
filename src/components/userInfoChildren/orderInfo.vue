<template>
      <div class="bg-wrap" style="min-height: 765px;">
                                        <div class="sub-tit">
                                            <a href="javascript:void(0)" @click="$router.back(-1)" class="add">
                                                <i class="iconfont icon-reply"></i>返回</a>
                                            <ul>
                                                <li class="selected">
                                                    <a href="javascript:;">查看订单</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="order-progress">
                                            <ul>
                                                <li class="first active">
                                                    <div class="progress">下单</div>
                                                    <div class="info">2017-10-25 21:38:15</div>
                                                </li>
                                                <li :class="orderInfo.status>=2?'active':''">
                                                    <div class="progress">已付款</div>
                                                    <div class="info">2017-10-25 21:38:15</div>
                                                </li>
                                                <li :class="orderInfo.status>=3?'active':''">
                                                    <div class="progress">已经发货</div>
                                                    <div class="info">2017-10-25 21:38:15</div>
                                                </li>
                                                <li class="last" :class="orderInfo.status>=4?'active':''">
                                                    <div class="progress">已完成</div>
                                                    <div class="info">2017-10-25 21:38:15</div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="form-box accept-box form-box1">
                                            <dl class="head form-group">
                                                <dd>
                                                    订单号：{{orderInfo.order_on}}

                                                    <a href="#/site/goods/payment/12" v-show="orderInfo.status<2" class="btn-pay">去付款</a>
                                                    <!---->
                                                </dd>
                                            </dl>
                                            <dl class="form-group">
                                                <dt>订单状态：</dt>
                                                <dd>
                                                    {{orderInfo.statusName}}
                                                </dd>
                                            </dl>
                                            <dl class="form-group">
                                                <dt>快递单号：</dt>
                                                <dd>
                                                  {{orderInfo.express_no}}
                                                </dd>
                                            </dl>
                                            <dl class="form-group">
                                                <dt>支付方式：</dt>
                                                <dd>{{orderInfo.paymentTitle}}</dd>
                                            </dl>
                                        </div>
                                        <div class="table-wrap">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="5" class="ftable">
                                                <tbody>
                                                    <tr>
                                                        <th align="left">商品信息</th>
                                                        <th width="60%">名称</th>
                                                        <th width="10%">单价
                                                        </th>
                                                        <th width="10%">数量</th>
                                                        <th width="10%">金额</th>
                                                    </tr>
                                                    <tr>
                                                        <td width="60">
                                                            <img :src="goodslist.imgurl" class="img">
                                                        </td>
                                                        <td align="left">
                                                            <a target="_blank" href="/goods/show-92.html">Apple iMac MF883CH/A 21.5英寸一体机电脑</a>
                                                        </td>
                                                        <td align="center">
                                                            <s>￥{{goodslist.real_price}}</s>
                                                            <p>￥{{goodslist.goods_price}}</p>
                                                        </td>
                                                        <td align="center">{{goodslist.quantity}}</td>
                                                        <td align="center">￥{{goodslist.goods_price}}</td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="7" align="right">
                                                            <p>商品金额：
                                                                <b class="red">￥{{goodslist.goods_price}}</b>&nbsp;&nbsp;&nbsp;&nbsp;运费：
                                                                <b class="red">￥{{goodslist.express_fee}}</b>
                                                            </p>
                                                            <p style="font-size: 22px;">应付总金额：
                                                                <b class="red" type="number">￥{{payPrice}}</b>
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="form-box accept-box">
                                            <dl class="head form-group">
                                                <dd>收货信息</dd>
                                            </dl>
                                            <dl class="form-group">
                                                <dt>顾客姓名：</dt>
                                                <dd>{{orderInfo.accept_name}}</dd>
                                            </dl>
                                            <dl class="form-group">
                                                <dt>送货地址：</dt>
                                                <dd>{{orderInfo.area}}</dd>
                                            </dl>
                                            <dl class="form-group">
                                                <dt>联系电话：</dt>
                                                <dd>{{orderInfo.mobile}} </dd>
                                            </dl>
                                            <dl class="form-group">
                                                <dt>电子邮箱：</dt>
                                                <dd>{{orderInfo.email}}</dd>
                                            </dl>
                                            <dl class="form-group">
                                                <dt>备注留言：</dt>
                                                <dd>{{orderInfo.message}}</dd>
                                            </dl>
                                        </div>
                                    </div>
</template>
<script>
    export default {
        name:"orderInfo",
        data(){
            return{
                orderId:"",  //获取id值
                orderInfo:[] , //商品信息
                goodslist:[], //商品列表
                payPrice:0, //应付金额

            }
        },
        methods:{
            getOrderInfo(){
                //获取商品id
                this.orderId = this.$route.params.orderid;
                this.$axios.get(`site/validate/order/getorderdetial/${this.orderId}`).then(rep=>{
                    //把应该付的价格计算处理
                    this.payPrice = rep.data.message.orderinfo.express_fee+ rep.data.message.goodslist[0].goods_price;
                    //保存数据
                    this.orderInfo =  rep.data.message.orderinfo;
                    this.goodslist = rep.data.message.goodslist[0];
                    // console.log(this.orderInfo)
                })
            }
        },
        created(){
            this.getOrderInfo();
           
        }
    }
</script>
<style>

</style>
