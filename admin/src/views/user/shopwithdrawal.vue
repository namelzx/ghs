<template>
  <div class="app-container">
    <!--<el-card class="filter-container" shadow="never">-->
    <!--<div>-->
    <!--<i class="el-icon-search"></i>-->
    <!--<span>筛选搜索</span>-->
    <!--<el-button-->
    <!--style="float:right"-->
    <!--type="primary"-->
    <!--@click="handleSearchList()"-->
    <!--size="small">-->
    <!--查询搜索-->
    <!--</el-button>-->
    <!--<el-button-->
    <!--style="float:right;margin-right: 15px"-->
    <!--@click="handleResetSearch()"-->
    <!--size="small">-->
    <!--重置-->
    <!--</el-button>-->
    <!--</div>-->
    <!--<div style="margin-top: 15px" class="search">-->
    <!--<el-form :inline="true" :model="listQuery" size="small" label-width="80px">-->
    <!--<el-form-item label="输入搜索：">-->
    <!--<el-input v-model="listQuery.out_trade_no" size="mini" class="input-width" placeholder="订单编号"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="评价昵称：">-->
    <!--<el-input v-model="listQuery.nickName" class="input-width" placeholder="用户昵称"></el-input>-->
    <!--</el-form-item>-->

    <!--<el-form-item label="评价内容：">-->
    <!--<el-input v-model="listQuery.desc" class="input-width" placeholder="评价内容"></el-input>-->
    <!--</el-form-item>-->
    <!--</el-form>-->
    <!--</div>-->
    <!--</el-card>-->
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" />
      <span>提现列表</span>
    </el-card>
    <div class="table-container">
      <el-table
        v-loading="listLoading"
        :data="list"
        stripe
        fit
        highlight-current-row
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />

        <el-table-column label="客户信息" align="left" fixed min-width="150px">
          <template slot-scope="scope">
            <div>
              <div v-if="scope.row.user" style="margin-left: 10px" class="link-type">{{
                scope.row.user.nickName }}
              </div>

            </div>
          </template>
        </el-table-column>

        <el-table-column label="提现金额" min-width="70px">
          <template slot-scope="scope">
            <div>{{ scope.row.money }}</div>
          </template>
        </el-table-column>

        <el-table-column label="提现状态" align="center" min-width="120px">
          <template slot-scope="scope">
            <div>{{ scope.row.status|statusFilter }}</div>
          </template>
        </el-table-column>

        <el-table-column label="提现类别" align="center" min-width="120px">
          <template slot-scope="scope">
            <div>{{ scope.row.type==1?'店铺提现':'个人提现' }}</div>
          </template>
        </el-table-column>

        <el-table-column label="提现时间" align="center" min-width="140px">
          <template slot-scope="scope">
            <div>{{ scope.row.create_time }}</div>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" align="center" width="120px" class-name="small-padding">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="handleUpdate(scope.row,1)"
            >通过
            </el-button>

          </template>
        </el-table-column>
      </el-table>

    </div>
    <div class="batch-operate-container">
      <el-select
        v-model="operateType"
        size="small"
        placeholder="批量操作"
      >
        <el-option
          v-for="item in operateOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        type="primary"
        size="small"
        @click="handleBatchOperate()"
      >
        确定
      </el-button>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        layout="total, sizes,prev, pager, next,jumper"
        :current-page="listQuery.page"
        :page-size="listQuery.limit"
        :page-sizes="[5,10,15]"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!--<logistics-dialog v-model ="logisticsDialogVisible"></logistics-dialog>-->
  </div>
</template>
<script>
import { GetDataByList, PostDataByAudit, GetIdByDel, PostRoleByUpdate, Postwithdrawal } from '@/api/shopwithdrawal'
import waves from '@/directive/waves'

const defaultListQuery = {
  page: 1,
  limit: 10

}
export default {
  name: 'OrderList',
  components: {},
  directives: {
    waves
  },
  filters: {

    nature(value) {
      if (value === 1) {
        return '正式用户'
      } else {
        return '游客'
      }
    },

    statusFilter(value) {
      if (value === 1) {
        return '审核通过'
      }
      if (value === 2) {
        return '审核中'
      }
      if (value === 3) {
        return '提现驳回'
      }
    }

  },
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: true,
      list: null,
      total: null,
      operateType: null,
      multipleSelection: [],
      closeOrder: {
        dialogVisible: false,
        content: null,
        orderIds: []
      },

      operateOptions: [
        {
          label: '批量通过',
          value: 1
        },

        {
          label: '驳回',
          value: 3
        }
      ],
      logisticsDialogVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleUpdate(row, status) {
      row.status = status
      PostDataByAudit(row).then(res => {
        console.log(res)
        this.getList()
      })
    },
    handleShop() {
      this.operateType = 1
      this.handleBatchOperate()
    },
    handleSalesman() {
      this.operateType = 2
      this.handleBatchOperate()
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery)
    },
    handleSearchList() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleViewOrder(index, row) {
      this.$router.push({ path: '/oms/orderDetail', query: { id: row.id }})
    },
    handleCloseOrder(index, row) {
      this.closeOrder.dialogVisible = true
      this.closeOrder.orderIds = [row.id]
    },
    handleDeliveryOrder(index, row) {
      const listItem = this.covertOrder(row)
      this.$router.push({ path: '/oms/deliverOrderList', query: { list: [listItem] }})
    },
    handleViewLogistics(index, row) {
      this.logisticsDialogVisible = true
    },
    handleDeleteOrder(index, row) {
      const ids = []
      ids.push(row.id)
      this.deleteOrder(ids)
    },
    handleBatchOperate() {
      if (this.multipleSelection == null || this.multipleSelection.length < 1) {
        this.$message({
          message: '最少选择一项',
          type: 'warning',
          duration: 1000
        })
        return
      }
      const ids = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        ids.push(this.multipleSelection[i].id)
      }
      if (this.operateType === 1) {
        var temp = {
          ids,
          field: 'status',
          status: 1

        }
        PostDataByAudit(temp).then(res => {
          this.getList()
        })
      } else if (this.operateType === 3) {
        var temp = {
          ids,
          field: 'status',
          status: 3

        }
        PostDataByAudit(temp).then(res => {
          this.getList()
        })
      } else if (this.operateType === 3) {
        // 删除订单
        const ids = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id)
        }
        this.deleteOrder(ids)
      }
    },
    handleSizeChange(val) {
      this.listQuery.page = 1
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleCloseOrderConfirm() {
      if (this.closeOrder.content == null || this.closeOrder.content === '') {
        this.$message({
          message: '操作备注不能为空',
          type: 'warning',
          duration: 1000
        })
        return
      }
      const params = new URLSearchParams()
      params.append('ids', this.closeOrder.orderIds)
      params.append('note', this.closeOrder.content)
      closeOrder(params).then(response => {
        this.closeOrder.orderIds = []
        this.closeOrder.dialogVisible = false
        this.getList()
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        })
      })
    },
    getList() {
      this.listLoading = true
      GetDataByList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.data.data
        console.log(this.list)
        this.total = response.data.total
      })
    },
    deleteOrder(ids) {
      this.$confirm('是否要进行该删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = new URLSearchParams()
        params.append('id', ids)
        GetIdByDel(params).then(response => {
          this.$message({
            message: '删除成功！',
            type: 'success',
            duration: 1000
          })
          this.getList()
        })
      })
    },
    covertOrder(order) {
      const address = order.receiverProvince + order.receiverCity + order.receiverRegion + order.receiverDetailAddress
      const listItem = {
        orderId: order.id,
        orderSn: order.orderSn,
        receiverName: order.receiverName,
        receiverPhone: order.receiverPhone,
        receiverPostCode: order.receiverPostCode,
        address: address,
        deliveryCompany: null,
        deliverySn: null
      }
      return listItem
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .input-width {
    width: 203px;
  }

  .search > > > .el-form-item__label {
    font-size: 12px;
  }

  .search {

  }

  .el-form-item {
    label {
      font-weight: 400 !important;
      font-size: 12px;
    }
  }

  .app-container > > > thead {
    color: #595961;
    font-size: 12px;
  }

  .app-container > > > .cell {
    /*display: flex;*/
    div {
      color: #595961;
      font-size: 12px;
    }
  }

  .headimgurl {
    width: 36px;
    height: 36px;
    border-radius: 4px;
    margin-right: 10px;
  }

</style>

