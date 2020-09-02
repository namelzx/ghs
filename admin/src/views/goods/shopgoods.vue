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
      </div>
      <div style="margin-top: 15px" class="search">
        <el-form :inline="true" :model="listQuery" size="small" label-width="80px">
          <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.title" size="mini" class="input-width" placeholder="搜索商品" />
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" />
      <span>商家商品列表</span>

    </el-card>
    <div class="table-container">
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="ID" align="center" width="65">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column label="商品名称" align="center" min-width="220px">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="封面图" align="center" min-width="120px">
          <template slot-scope="scope">
            <img class="headimgurl" :src="scope.row.images_url">
          </template>
        </el-table-column>

        <el-table-column label="库存" align="center" min-width="120px">
          <template slot-scope="scope">
            {{ scope.row.inventory }}
          </template>
        </el-table-column>

        <el-table-column label="市场价" align="center" min-width="120px">
          <template slot-scope="scope">
            {{ scope.row.line_price }}
          </template>
        </el-table-column>
        <el-table-column label="销售价" align="center" min-width="120px">
          <template slot-scope="scope">
            {{ scope.row.price }}
          </template>
        </el-table-column>

        <el-table-column label="销量" align="center" min-width="120px">
          <template slot-scope="scope">
            {{ scope.row.sales }}
          </template>
        </el-table-column>

        <el-table-column label="状态" width="80px" align="center">
          <template slot-scope="scope">
            <span
              :class="{'el-icon-success text-green':scope.row.status == 1,'el-icon-error text-red':scope.row.status == 2}"
              @click="handleModifyStatus(scope.$index,scope.row.id,scope.row.status)"
            >
              {{ scope.row.status | statusFilter }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" align="center" width="120px" class-name="small-padding">
          <template slot-scope="scope">
            <el-button
              v-waves
              :loading="scope.row.delete"
              type="text"
              size="mini"
              @click="handleDelete(scope.$index,scope.row.id)"
            > 删除
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
import { GetDataByList, closeOrder, GetIdByDel, PostRoleByUpdate, change, del } from '@/api/goods'
import waves from '@/directive/waves'

const defaultListQuery = {
  page: 1,
  limit: 10,
  type: 2

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
  methods: {
    handleModifyStatus(index, id, status) {
      if (status === 2) {
        this.list[index]['status'] = 1
      } else {
        this.list[index]['status'] = 2
      }
      change(id, 'status', this.list[index]['status']).then(response => {
      })
    },
    handleDelete(index, id) {
      const _this = this
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.$set(_this.list[index], 'delete', true)
        del(id).then(response => {
          if (response.status === 1) {
            _this.list.splice(index, 1)
            _this.total = _this.total - 1
            _this.$notify.success(response.msg)
          } else {
            _this.$notify.error(response.msg)
          }
          _this.$set(_this.list[index], 'delete', false)
        }).catch((error) => {
          _this.$set(_this.list[index], 'delete', false)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
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
        // 设为店长
        var temp = {
          ids,
          field: 'is_shop',
          status: 1

        }
        PostRoleByUpdate(temp).then(res => {
          this.getList()
        })
      } else if (this.operateType === 2) {
        var temp = {
          ids,
          field: 'is_salesman',
          status: 1

        }
        PostRoleByUpdate(temp).then(res => {
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

