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
                                    <li class="active">
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
                        <div class="cart-box">
                            <h2 class="slide-tit">
                                <span>1、收货地址</span>
                            </h2>
                            <div id="orderForm" name="orderForm" url="">
                            <el-form ref="form" :model="form" :rules="rules" label-width="100px" style="padding: 20px 0;">
                                      <el-form-item label="收货人姓名:" prop="name">
                                         <el-input v-model="form.name" style="width:500px;" autocomplete="off"></el-input>
                                     </el-form-item>
                                      <el-form-item label="所在区域:" prop="area">
                                         <v-distpicker :province="select.province" :city="select.city" :area="select.area"></v-distpicker>
                                     </el-form-item>
                                      <el-form-item label="详细地址:" prop="address">
                                         <el-input v-model="form.address" style="width:500px;"></el-input>
                                     </el-form-item>
                                      <el-form-item label="手机号码:" prop="mobile">
                                         <el-input v-model="form.mobile" style="width:500px;"></el-input>
                                     </el-form-item>
                                      <el-form-item label="电子邮箱:" prop="Email">
                                         <el-input v-model="form.Email" style="width:500px;"></el-input>
                                     </el-form-item>
                                      <el-form-item label="邮箱编码:" prop="Postcode">
                                         <el-input v-model="form.Postcode" style="width:150px;"></el-input>
                                     </el-form-item>
                                     
                            </el-form>    
                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <!-- <label>
                                            <input name="payment_id" type="radio" onclick="paymentAmountTotal(this);" value="1">
                                            <input name="payment_price" type="hidden" value="0.00">在线支付
                                            <em>手续费：0.00元</em>
                                        </label> -->
                                        <el-radio-group v-model="form.pay">
                                            <el-radio label=true >在线支付</el-radio>
                                        </el-radio-group>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                         <el-radio-group v-model="form.express">
                                            <el-radio style="margin-right:5px;" label="0" >顺丰快递:  <span style="color:#ccc;">20.00</span></el-radio>
                                            
                                            <el-radio style="margin-right:5px;" label="1" >圆通快递:  <span style="color:#ccc;">-10.00</span></el-radio>
                                            
                                            <el-radio style="margin-right:5px;" label="2" >韵达快递:  <span style="color:#ccc;">00.00</span></el-radio>
                                            
                                        </el-radio-group>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr>
                                            <td width="68">
                                                <a target="_blank" href="/goods/show-89.html">
                                                    <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200046589514.jpg" class="img">
                                                </a>
                                            </td>
                                            <td>
                                                <a target="_blank" href="/goods/show-89.html">小米（Mi）小米Note 16G双网通版</a>
                                            </td>
                                            <td>
                                                <span class="red">
                                                    ￥2299.00
                                                </span>
                                            </td>
                                            <td align="center">1</td>
                                            <td>
                                                <span class="red">
                                                    ￥2299.00
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <dt>订单备注(100字符以内)</dt>
                                            <dd>
                                                <textarea name="message" class="input" style="height:35px;"></textarea>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">1</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">2299.00</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">0.00</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">2299.00</label>
                                        </p>
                                        <p class="btn-box">
                                            <router-link class="btn button" to="/shopCart">返回购物车</router-link>
                                            <a id="btnSubmit" class="btn submit">确认提交</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>

    </div>
</template>

<script>
import VDistpicker from "v-distpicker";

export default {
  name: "checkOrder",
  //使用省级联动组件
  components: { VDistpicker },
  data() {
    //验证手机号码
    var validateMobile = (rule, value, callback) => {
      let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (reg.test(value) == false) {
        callback(new Error("你输入号码的格式不对!"));
      } else {
        callback();
      }
    };
    //验证验证邮箱
    var validateEmail = (rule, value, callback) => {
      let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (value === "") {
        callback(new Error("邮箱不能为空"));
      } else if (reg.test(value) == false) {
        callback(new Error("你输入邮箱的格式不对!"));
      } else {
        callback();
      }
    };
    return {
      //省级联动数据
      select: { province: "广东省", city: "广州市", area: "海珠区" },
      form: {
        name: "",
        area: "",
        address: "",
        mobile: "",
        Email: "",
        Postcode: "100000",
        delivery: false
      },
      //验证规则
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        address: [
          {
            required: true,
            message: "请输入具体的详细地址方便派送",
            trigger: "blur"
          }
        ],
        mobile: [{ validator: validateMobile, trigger: "blur" }],
        Email: [{ validator: validateEmail, trigger: "blur" }]
      }
    };
  },
  methods: {
    validateField() {
      console.log(value);
    }
  }
};
</script>
