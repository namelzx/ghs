<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="orderSetting"
             ref="orderSettingForm"
             :rules="rules"
             label-width="150px">
      <el-form-item label="平台手续费：" >
        <el-input v-model="orderSetting.poundage" class="input-width">
          <template slot="append">%</template>
        </el-input>
        <span class="note-margin">商家商品签收扣除,订单总价百分比</span>
      </el-form-item>
      <el-form-item label="正常订单超过：" >
        <el-input v-model="orderSetting.normalOrderOvertime" class="input-width">
          <template slot="append">分</template>
        </el-input>
        <span class="note-margin">未付款，订单自动关闭</span>
      </el-form-item>
      <el-form-item label="发货超过：">
        <el-input v-model="orderSetting.confirmOvertime" class="input-width">
          <template slot="append">天</template>
        </el-input>
        <span class="note-margin">未收货，订单自动完成</span>
      </el-form-item>
      <!--<el-form-item label="订单完成超过：" prop="finishOvertime">-->
        <!--<el-input v-model="orderSetting.finishOvertime" class="input-width">-->
          <!--<template slot="append">天</template>-->
        <!--</el-input>-->
        <!--<span class="note-margin">自动结束交易，不能申请售后</span>-->
      <!--</el-form-item>-->

      <el-form-item label="测试支付模块">
        <el-switch v-model="orderSetting.pay"></el-switch>
      </el-form-item>
      <el-form-item label="订单完成超过：" prop="commentOvertime">
        <el-input v-model="orderSetting.commentOvertime" class="input-width">
          <template slot="append">天</template>
        </el-input>
        <span class="note-margin">自动五星好评</span>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="confirm('orderSettingForm')"
          type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {GetConfigByInfo,PostDataByUpdate} from '@/api/config';
  const defaultOrderSetting = {
    id: null,
    poundage: 0,
    normalOrderOvertime: 0,
    confirmOvertime: 0,
    finishOvertime: 0,
    commentOvertime: 0
  };
  const checkTime = (rule, value, callback) => {
    if (!value) {
      return callback(new Error('时间不能为空'));
    }
    console.log("checkTime",value);
    let intValue = parseInt(value);
    if (!Number.isInteger(intValue)) {
      return callback(new Error('请输入数字值'));
    }
    callback();
  };
  export default {
    name: 'orderSetting',
    data() {
      return {
        orderSetting: Object.assign({}, defaultOrderSetting),
        rules: {
          // poundage:{validator: checkTime, trigger: 'blur' },
          // normalOrderOvertime:{validator: checkTime, trigger: 'blur' },
          // confirmOvertime: {validator: checkTime, trigger: 'blur' },
          // finishOvertime: {validator: checkTime, trigger: 'blur' },
          // commentOvertime:{validator: checkTime, trigger: 'blur' }
        }
      }
    },
    created(){
      this.getDetail();
    },
    methods:{
      confirm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否要提交修改?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              PostDataByUpdate(this.orderSetting).then(response=>{
                this.$message({
                  type: 'success',
                  message: '提交成功!',
                  duration:1000
                });
              })
            });
          } else {
            this.$message({
              message: '提交参数不合法',
              type: 'warning'
            });
            return false;
          }
        });
      },
      getDetail(){
        GetConfigByInfo().then(response=>{
          this.orderSetting=response.data;
          if(this.orderSetting.pay===1){
            this.orderSetting.pay=true
          }else{
            this.orderSetting.pay=false
          }
        })
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 50%;
  }

  .note-margin {
    margin-left: 15px;
  }
  .el-form{
    margin: 10%;
  }
</style>


