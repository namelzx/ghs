<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search" />
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          size="small"
          @click="handleSearchList()"
        >
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          size="small"
          @click="handleResetSearch()"
        >
          重置
        </el-button>

        <el-button
          style="float:right"
          type="primary"
          size="small"
          @click="handleDownload()"
        >
          导出
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.orderSn" class="input-width" placeholder="订单编号" />
          </el-form-item>
          <el-form-item label="收货人：">
            <el-input v-model="listQuery.receiverKeyword" class="input-width" placeholder="收货人姓名/手机号码" />
          </el-form-item>
          <el-form-item label="提交时间：">
            <el-date-picker
              v-model="listQuery.createTime"
              type="datetimerange"
              class="input-width"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item label="订单状态：">
            <el-select v-model="listQuery.status" class="input-width" placeholder="全部" clearable>
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="订单分类：">
            <el-select v-model="listQuery.orderType" class="input-width" placeholder="全部" clearable>
              <el-option
                v-for="item in orderTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="所属产品：">
            <el-input v-model="listQuery.goodsname" class="input-width" placeholder="输入产品" />
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" />
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table
        ref="orderTable"
        v-loading="listLoading"
        :data="list"
        style="width: 100%;"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="60" align="center" />
        <el-table-column label="编号" width="80" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="微信流水单号" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.out_trade_no }}</template>
        </el-table-column>

        <el-table-column label="下单人" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.buyerName }}</template>
        </el-table-column>
        <el-table-column label="提交时间" width="180" align="center">
          <template slot-scope="scope">{{ scope.row.create_time }}</template>
        </el-table-column>
        <el-table-column label="订单金额" width="120" align="center">
          <template slot-scope="scope">￥{{ scope.row.totalPrice }}</template>
        </el-table-column>
        <el-table-column label="支付方式" width="120" align="center">
          <template slot-scope="scope">微信支付</template>
        </el-table-column>
        <el-table-column label="订单状态" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.status|stStrstatus }}</template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleViewOrder(scope.$index, scope.row)"
            >查看订单
            </el-button>
            <el-button
              v-show="scope.row.status===0"
              size="mini"
              type="text"
              @click="handleCloseOrder(scope.$index, scope.row)"
            >关闭订单
            </el-button>
            <el-button
              v-show="scope.row.status===2"
              size="mini"
              type="text"
              @click="handleDeliveryOrder(scope.$index, scope.row)"
            >订单发货
            </el-button>
            <el-button
              v-show="scope.row.status===3||scope.row.status===4||scope.row.status===5"
              size="mini"
              type="text"
              @click="handleViewLogistics(scope.$index, scope.row)"
            >订单跟踪
            </el-button>
            <el-button
              v-show="scope.row.status===5"
              size="mini"
              type="text"
              @click="handleDeleteOrder(scope.$index, scope.row)"
            >删除订单
            </el-button>
            <el-button
              v-if="scope.row.status!==-1"
              v-show="scope.row.status>1"
              size="mini"
              type="text"
              @click="handleRefundOrder(scope.row)"
            >退款
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
        :current-page.sync="listQuery.page"
        :page-size="listQuery.limit"
        :page-sizes="[5,10,15]"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog
      title="关闭订单"
      :visible.sync="closeOrder.dialogVisible"
      width="30%"
    >
      <span style="vertical-align: top">操作备注：</span>
      <el-input
        v-model="closeOrder.content"
        style="width: 80%"
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeOrder.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCloseOrderConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <logistics-dialog v-model="logisticsDialogVisible" :courlist="courlist" />
  </div>
</template>
<script>
import { GetDataByList, closeOrder, GetIdByDel, PostRoleByUpdate, PostDataByRefund, GetQueryBydownload } from '@/api/order'
import waves from '@/directive/waves'
import LogisticsDialog from './components/logisticsDialog'
import { getlistcourier } from '@/api/courier'

const defaultListQuery = {
  page: 1,
  limit: 10

}
export default {
  name: 'OrderList',
  components: {
    LogisticsDialog
  },
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
    stStrstatus(value) {
      if (value === 1) {
        return '待付款'
      }
      if (value === 2) {
        return '已付款'
      }
      if (value === 3) {
        return '已发货'
      }
      if (value === -1) {
        return '已退款'
      }
      if (value === 4) {
        return '订单完成'
      } else {
        return '订单完成'
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
          value: 1
        },
        {
          label: '已支付',
          value: 2
        },
        {
          label: '已发货',
          value: 3
        },
        {
          label: '已完成',
          value: 4
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
          label: '设为店长',
          value: 1
        },
        {
          label: '社会',
          value: 2
        },
        {
          label: '删除订单',
          value: 3
        }
      ],
      courlist: [],
      logisticsDialogVisible: false
    }
  },
  created() {
    this.listQuery.page = this.$route.query.page || 1

    this.getList()
  },
  methods: {
    handleRefundOrder(row) {
      PostDataByRefund(row).then(res => {
        this.$message.success('退款成功')
        this.getList()
      })
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
      this.$router.push({ path: '/order/orderDetail', query: { id: row.id }})
    },
    handleCloseOrder(index, row) {
      this.closeOrder.dialogVisible = true
      this.closeOrder.orderIds = [row.id]
    },
    handleDeliveryOrder(index, row) {
      const listItem = this.covertOrder(row)
      this.$router.push({ path: '/order/deliver', query: { list: [listItem], page: this.listQuery.page }})
    },
    handleViewLogistics(index, row) {
      if (row.deliveryCompany === 'TC') {
        this.$message.error('同城快递不支持物流更新')
        return true
      }
      var temp = {
        deliveryCompany: row.deliveryCompany,
        deliverySn: row.deliverySn
      }
      getlistcourier(temp).then(res => {
        this.courlist = res.data.result.list
      })
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
          message: '请选择要操作的订单',
          type: 'warning',
          duration: 1000
        })
        return
      }
      if (this.operateType === 1) {
        // 批量发货
        const list = []
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
        this.$router.push({ path: '/oms/deliverOrderList', query: { list: list }})
      } else if (this.operateType === 2) {
        // 关闭订单
        this.closeOrder.orderIds = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          this.closeOrder.orderIds.push(this.multipleSelection[i].id)
        }
        this.closeOrder.dialogVisible = true
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
        params.append('ids', ids)
        deleteOrder(params).then(response => {
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
      const listItem = {
        id: order.id,
        out_trade_no: order.out_trade_no,
        buyerName: order.buyerName,
        mobile: order.mobile,
        addressText: order.addressText,
        deliveryCompany: null,
        deliverySn: null
      }
      return listItem
    },

    // 导出数据
    handleDownload() {
      this.listLoading = true
      GetQueryBydownload(this.listQuery).then(res => {
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = res.data.tHeader
          const filterVal = res.data.filterVal
          const data = this.formatJson(res.data.data, filterVal)

          var day2 = new Date()
          day2.setTime(day2.getTime())
          var s2 =
            day2.getFullYear() +
            '-' +
            (day2.getMonth() + 1) +
            '-' +
            day2.getDate()
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '安装单-' + s2
          })
          this.listLoading = false
          this.$message.success('下载成功')
        })
      })
    },
    formatJson(data, filterVal) {
      return data.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
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

