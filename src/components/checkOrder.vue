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
                                      <el-form-item label="收货人姓名:" prop="accept_name">
                                         <el-input v-model="form.accept_name" style="width:500px;" autocomplete="off"></el-input>
                                     </el-form-item>
                                      <el-form-item label="所在区域:" prop="area">
                                         <v-distpicker @selected="onSelected" :province="form.area.province.value" :city="form.area.city.value" :area="form.area.area.value"></v-distpicker>
                                     </el-form-item>
                                      <el-form-item label="详细地址:" prop="address">
                                         <el-input v-model="form.address" style="width:500px;"></el-input>
                                     </el-form-item>
                                      <el-form-item label="手机号码:" prop="mobile">
                                         <el-input v-model="form.mobile" style="width:500px;"></el-input>
                                     </el-form-item>
                                      <el-form-item label="电子邮箱:" prop="email">
                                         <el-input v-model="form.email" style="width:500px;"></el-input>
                                     </el-form-item>
                                      <el-form-item label="邮箱编码:" prop="post_code">
                                         <el-input v-model="form.post_code" style="width:150px;"></el-input>
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
                                        <el-radio-group  v-model="form.payment_id">
                                            <el-radio :label="6" >在线支付</el-radio>
                                        </el-radio-group>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                         <el-radio-group v-model="form.express_id">
                                            <el-radio  style="margin-right:5px;" :label="1" @change="express(20.00,1)">顺丰快递:  <span  style="color:#ccc;">20.00</span></el-radio>
                                            
                                            <el-radio style="margin-right:5px;" :label="2" @change="express(-1.00,2)">圆通快递:  <span style="color:#ccc;">-1.00</span></el-radio>
                                            
                                            <el-radio style="margin-right:5px;" :label="3" @change="express(0.00,3)">韵达快递:  <span style="color:#ccc;">00.00</span></el-radio>
                                            
                                        </el-radio-group>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span >4、商品清单</span>
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
                                        <tr v-for="item in goodsInfo" :key="item.id">
                                            <td width="68">
                                                <a target="_blank" href="/goods/show-89.html">
                                                    <img :src="item.img_url" class="img">
                                                </a>
                                            </td>
                                            <td>
                                                <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                            </td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price}}
                                                </span>
                                            </td>
                                            <td align="center">{{item.buycount}}</td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.totalamount*item.buycount}}
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
                                                <textarea name="message" v-model="form.message" class="input" style="height:35px;"></textarea>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">{{totalNum}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">{{form.goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">{{form.expressMoment}}</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">{{form.goodsAmount+form.expressMoment}}</label>
                                        </p>
                                        <p class="btn-box">
                                            <router-link class="btn button" to="/shopCart">返回购物车</router-link>
                                            <a id="btnSubmit" @click="setPayInfo" class="btn submit">确认提交</a>
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
      goodsInfo: [], //商品信息
      form: {
        accept_name: "老黄", //收货人
        area: {
          //收货人地区
          province: { code: "440000", value: "广东省" }, //省
          city: { code: "440300", value: "深圳市" }, //市
          area: { code: "440306", value: "宝安区" } //区
        },
        address: "", //详细地址
        mobile: "", //手机号码
        email: "", //邮箱
        post_code: "100000", //收货人邮编
        goodsAmount: 0, //商品总额
        expressMoment: 20, //快递费
        payment_id: 6, //支付方式
        express_id: 1, //运送方式
        message: "天气有点凉,大家记得多穿衣服!!!", //订单备注
        goodsids: "", //需要付款的所有id
        cargoodsobj: {} //购买的商品对象
      },
      //验证规则
      rules: {
        accept_name: [
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
        email: [{ validator: validateEmail, trigger: "blur" }]
      }
    };
  },
  methods: {
    //快递费
    express(val, exp_id) {
      //快递费用,记得把val转成number类型
      this.form.expressMoment = Number(val);
      this.form.express_id = exp_id;
      // console.log(this.form.express_id)
    },
    //获取传过来的id值,并且发送请求数据
    getGoodInfo() {
      //获取url传过来的id
      this.form.goodsids = this.$route.params.ids;
      //先把字符串分割成数据
      let Ids = this.$route.params.ids.split(",");
      this.$axios
        .get(`site/validate/order/getgoodslist/${this.form.goodsids}`)
        .then(rep => {
          //遍历传过来的全部id
          Ids.forEach((v, index) => {
            //遍历vuex仓库的数据数量值
            for (let key in this.$store.state.shopCart) {
              //判断两个id值相等则添加仓库的数量值
              if (v == key) {
                //保存每个商品的数量
                rep.data.message[index].buycount = this.$store.state.shopCart[
                  key
                ];
                //保存cargoodsobj数据,方便发送
                this.form.cargoodsobj[key] = this.$store.state.shopCart[key];
              }
            }
          });
        //  console.log(rep)
          //保存商品数据
          this.goodsInfo = rep.data.message;
          this.totalPrice();
        //   console.log(this.goodsInfo)
        });
    },
    //返回地区的值
    onSelected(data) {
      //遍历,把值保存
      this.form.area = data;
    },
    //点击发送数据
    setPayInfo() {
       let Ids = this.$route.params.ids.split(",");
      this.$axios.post("site/validate/order/setorder", this.form).then(rep => {
        //  console.log(rep);
        if (rep.data.status == 0) {
        //逐个删除仓库数据
        Ids.forEach(v=>{
           this.$store.commit("delShopCart",v)
        })

        this.$router.push("/Orderdetail/" + rep.data.message.orderid);

        } else {
          alert("服务器没响应");
        }
      });
    },
    //总价格
    totalPrice() {
        console.log(this.goodsInfo)
      let num = 0;
      this.goodsInfo.forEach(v => {
        num += v.buycount * v.sell_price;
      });
      this.form.goodsAmount = num;
    }
  },
  computed: {
    //总数量
    totalNum() {
      let num = 0;
      this.goodsInfo.forEach(v => {
        num += v.buycount;
      });
      return num;
    }
    
  },
  created() {
    //获取数据
    this.getGoodInfo();

  },
  
};
</script>
