<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px" class="search">
        <el-form :inline="true" :model="listQuery" size="small" label-width="80px">
          <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.out_trade_no" size="mini" class="input-width" placeholder="订单编号"></el-input>
          </el-form-item>
          <el-form-item label="评价昵称：">
            <el-input v-model="listQuery.nickName" class="input-width" placeholder="用户昵称"></el-input>
          </el-form-item>

          <el-form-item label="评价内容：">
            <el-input v-model="listQuery.desc" class="input-width" placeholder="评价内容"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table
        v-loading="listLoading"
        :key="tableKey"
        :data="list"
        stripe
        fit
        highlight-current-row
        style="width: 100%;"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"/>

        <el-table-column label="名称" min-width="80px" fixed="left">
          <template slot-scope="scope">
            <span class="link-type" @click="handleUpdate(scope.$index,scope.row.id)">{{ scope.row.nickName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="头像" align="center" min-width="100px">
          <template slot-scope="scope">
            <img class="headimgurl" :src="scope.row.avatarUrl"/>
          </template>
        </el-table-column>

        <el-table-column label="累计佣金" align="center" min-width="70px">
          <template slot-scope="scope">
            <span>{{scope.row.cumulative_commission}}</span>
          </template>
        </el-table-column>


        <el-table-column label="佣金余额" align="center" min-width="70px">
          <template slot-scope="scope">
            <span>{{scope.row.available_commission}}</span>
          </template>
        </el-table-column>


        <el-table-column label="是否是商家" align="center" min-width="100px">
          <template slot-scope="scope">
            {{scope.row.is_business|statusFilter}}
          </template>
        </el-table-column>


        <el-table-column label="加入平台时间" align="center" min-width="120px">
          <template slot-scope="scope">
            <span>{{scope.row.create_time}}</span>
          </template>
        </el-table-column>

        <el-table-column label="属性" align="center" min-width="120px">
          <template slot-scope="scope">
            <span>{{scope.row.nature|nature}}</span>
          </template>
        </el-table-column>


        <el-table-column label="操作" align="center" width="120px" class-name="small-padding">
          <template slot-scope="scope">
            <el-button type="text" size="mini"
                       @click="handleUpdate(scope.$index,scope.row.id)">编辑
            </el-button>
            <el-button v-waves :loading="scope.row.delete" type="text" size="mini"
                       @click="handleDelete(scope.$index,scope.row.id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <div class="batch-operate-container">
      <el-select
        size="small"
        v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operateOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small">
        确定
      </el-button>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page="listQuery.page"
        :page-size="listQuery.limit"
        :page-sizes="[5,10,15]"
        :total="total">
      </el-pagination>
    </div>

    <!--<logistics-dialog v-model ="logisticsDialogVisible"></logistics-dialog>-->
  </div>
</template>
<script>
  import { GetDataByList, closeOrder, deleteOrder, GetIdByDel } from '@/api/wechatuser'

  const defaultListQuery = {
    page: 1,
    limit: 10

  }
  export default {
    name: 'orderList',
    components: {},
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
        statusOptions: [
          {
            label: '待付款',
            value: 0
          },
          {
            label: '待发货',
            value: 1
          },
          {
            label: '已发货',
            value: 2
          },
          {
            label: '已完成',
            value: 3
          },
          {
            label: '已关闭',
            value: 4
          }
        ],
        orderTypeOptions: [
          {
            label: '正常订单',
            value: 0
          },
          {
            label: '秒杀订单',
            value: 1
          }
        ],
        sourceTypeOptions: [
          {
            label: 'PC订单',
            value: 0
          },
          {
            label: 'APP订单',
            value: 1
          }
        ],
        operateOptions: [
          {
            label: '批量发货',
            value: 1
          },
          {
            label: '关闭订单',
            value: 2
          },
          {
            label: '删除订单',
            value: 3
          }
        ],
        logisticsDialogVisible: false
      }
    },
    created() {
      this.getList()
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
          return '是'
        } else {
          return '否'
        }
      }

    },
    methods: {
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
        this.$router.push({ path: '/oms/orderDetail', query: { id: row.id } })
      },
      handleCloseOrder(index, row) {
        this.closeOrder.dialogVisible = true
        this.closeOrder.orderIds = [row.id]
      },
      handleDeliveryOrder(index, row) {
        let listItem = this.covertOrder(row)
        this.$router.push({ path: '/oms/deliverOrderList', query: { list: [listItem] } })
      },
      handleViewLogistics(index, row) {
        this.logisticsDialogVisible = true
      },
      handleDeleteOrder(index, row) {
        let ids = []
        ids.push(row.id)
        this.deleteOrder(ids)
      },
      handleBatchOperate() {
        if (this.multipleSelection == null || this.multipleSelection.length < 1) {
          this.$message({
            message: '请选择要操作的订单',
            type: 'warning',
            duration: 1000
          })
          return
        }
        if (this.operateType === 1) {
          //批量发货
          let list = []
          for (let i = 0; i < this.multipleSelection.length; i++) {
            if (this.multipleSelection[i].status === 1) {
              list.push(this.covertOrder(this.multipleSelection[i]))
            }
          }
          if (list.length === 0) {
            this.$message({
              message: '选中订单中没有可以发货的订单',
              type: 'warning',
              duration: 1000
            })
            return
          }
          this.$router.push({ path: '/oms/deliverOrderList', query: { list: list } })
        } else if (this.operateType === 2) {
          //关闭订单
          this.closeOrder.orderIds = []
          for (let i = 0; i < this.multipleSelection.length; i++) {
            this.closeOrder.orderIds.push(this.multipleSelection[i].id)
          }
          this.closeOrder.dialogVisible = true
        } else if (this.operateType === 3) {
          //删除订单
          let ids = []
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
        let params = new URLSearchParams()
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
          let params = new URLSearchParams()
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
        let address = order.receiverProvince + order.receiverCity + order.receiverRegion + order.receiverDetailAddress
        let listItem = {
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
<style lang="scss" scoped>
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

  .headimgurl {
    width: 60px;
    height: 60px;
  }

</style>


