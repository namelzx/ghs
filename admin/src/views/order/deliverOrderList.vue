<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" />
      <span>发货列表</span>
    </el-card>
    <div class="table-container">
      <el-table
        ref="deliverOrderTable"
        style="width: 100%;"
        :data="list"
        border
      >
        <el-table-column label="订单编号" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.out_trade_no }}</template>
        </el-table-column>
        <el-table-column label="收货人" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.buyerName }}</template>
        </el-table-column>
        <el-table-column label="手机号码" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.mobile }}</template>
        </el-table-column>
        <el-table-column label="收货地址" align="center">
          <template slot-scope="scope">{{ scope.row.addressText }}</template>
        </el-table-column>
        <el-table-column label="配送方式" width="160" align="center">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.deliveryCompany"
              placeholder="请选择物流公司"
              size="small"
            >
              <el-option
                v-for="item in companyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="物流单号" width="180" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.deliverySn" size="small" />
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 15px;text-align: center">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { deliveryOrder } from '@/api/order'

const defaultLogisticsCompanies = ['顺丰快递', '圆通快递', '中通快递', '韵达快递', '同城配送']
export default {
  name: 'DeliverOrderList',
  data() {
    return {

      list: [],
      page: 0,
      companyOptions: [
        {
          label: '同城配送',
          value: 'TC'
        },
        {
          label: '顺丰',
          value: 'SFEXPRESS'
        },
        {
          label: '韵达',
          value: 'YUNDA'
        },

        {
          label: '百世快递',
          value: 'HTKY'
        },

        {
          label: '申通',
          value: 'STO'
        },
        {
          label: '中通',
          value: 'ZTO'
        },
        {
          label: '圆通',
          value: 'YTO'
        },
        {
          label: '天天快递',
          value: 'TTKDEX'
        }

      ]
    }
  },
  created() {
    this.list = this.$route.query.list
    this.page = this.$route.query.page
    console.log(this.list)
  },
  methods: {
    cancel() {
      this.$router.back()
    },
    confirm() {
      this.$confirm('是否要进行发货操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deliveryOrder(this.list[0]).then(response => {
          this.$message({
            type: 'success',
            message: '发货成功!'
          })
          this.$router.push({ path: '/order/index', query: { page: this.page }})
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发货'
        })
      })
    }
  }
}
</script>
<style></style>

