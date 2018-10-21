<template>
    <div class="bg-wrap" style="min-height: 765px;">
        <div class="sub-tit">
            <ul>
                <li class="selected">
                    <a href="/user/order-list.html">交易订单</a>
                </li>
            </ul>
        </div>
        <div class="table-wrap">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="ftable">
                <tbody>
                    <tr>
                        <th width="16%" align="left">订单号</th>
                        <th width="10%">姓名</th>
                        <th width="12%">订单金额</th>
                        <th width="11%">下单时间</th>
                        <th width="10%">状态</th>
                        <th width="12%">操作</th>
                    </tr>
                    <tr v-for="item in allOrder" :key="item.id">
                        <td>{{item.order_on}}</td>
                        <td align="left">{{item.accept_name}}</td>
                        <td align="left">
                            <strong style="color: red;">￥{{item.order_amount}}</strong>
                            <br> {{item.paymentTitle}}
                        </td>
                        <td align="left">2017-10-25 21:38:15</td>
                        <td align="left">
                            {{item.statusName}}
                        </td>
                        <td align="left">
                            <router-link :to="'/orderInfo/'+item.id">查看订单</router-link>
                            <br>
                            <a href="#/site/goods/payment/12" class="" v-if="item.status==1">|去付款</a>
                            <!-- <br>
                            <a href="javascript:void(0)">|取消</a>
                            <br> -->
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="page-foot">
                
            </div>
        </div>
        <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
    </div>
</template>
<script>
export default {
  name: "orderList",
  data() {
    return {
        currentPage: 1, //当前页码
        pageSize: 10 , //页容量
        allOrder:[]   //所有订单
    };
  },
  methods: {
      //获取所有订单
    getOrderList(page,pageSize) {
        this.page=page||1;
        this.pageSize=pageSize||10;
        this.$parent.isLoading=true;
      this.$axios
        .get(`site/validate/order/userorderlist?pageIndex=${this.page}&pageSize=${this.pageSize}`)
        .then(rep => {
            // console.log(rep.data
            this.$parent.isLoading=false;
            this.allOrder = rep.data.message;
        });
    },
    //页容量改变时触发
    handleSizeChange(val) {
        this.pageSize=val;
        this.getOrderList(this.currentPage,this.pageSize);
      },
      //当前页改变是触发
      handleCurrentChange(val) {
        
        this.currentPage=val;
        this.getOrderList(this.currentPage);

      }
  },
  created(){
      this.getOrderList();
  }
};
</script>
<style>
</style>
