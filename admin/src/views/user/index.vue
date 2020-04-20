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
          <el-form-item label="输入昵称：">
            <el-input v-model="listQuery.nickName" size="mini" class="input-width" placeholder="输入昵称"></el-input>
          </el-form-item>

        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>批量操作</span>
      <el-button size="small" @click="handleShop()" plain>设店长</el-button>
      <el-button size="small" @click="handleSalesman()" plain>设产品经理</el-button>
    </el-card>
    <div class="table-container">
      <el-table
        v-loading="listLoading"
        :data="list"
        stripe
        fit
        highlight-current-row
        style="width: 100%;"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"/>


        <el-table-column label="客户信息" align="left" fixed min-width="150px">
          <template slot-scope="scope">
            <div>
              <img style="    float: left;" class="headimgurl" :src="scope.row.avatarUrl"/>
              <div style="margin-left: 10px" class="link-type" >{{
                scope.row.nickName }}
              </div>

            </div>
          </template>
        </el-table-column>

        <el-table-column label="累计佣金" min-width="70px">
          <template slot-scope="scope">
            <div>{{scope.row.cumulative_commission}}</div>
          </template>
        </el-table-column>


        <el-table-column label="当前余额" align="center" min-width="70px">
          <template slot-scope="scope">
            <div>{{scope.row.available_commission}}</div>
          </template>
        </el-table-column>

        <el-table-column label="邀请用户数" align="center" min-width="120px">
          <template slot-scope="scope">
            <div>{{scope.row.invite}}</div>
          </template>
        </el-table-column>
        <el-table-column label="是否是商家" align="center" min-width="100px">
          <template slot-scope="scope">
            <div> {{scope.row.is_business|statusFilter}}</div>
          </template>
        </el-table-column>

        <el-table-column label="是否是店长" align="center" min-width="100px">
          <template slot-scope="scope">
            <div> {{scope.row.is_shop|statusFilter}}</div>
          </template>
        </el-table-column>

        <el-table-column label="产品经理" align="center" min-width="100px">
          <template slot-scope="scope">
            <div> {{scope.row.is_product|statusFilter}}</div>
          </template>
        </el-table-column>
        <el-table-column label="加入平台时间" align="center" min-width="140px">
          <template slot-scope="scope">
            <div>{{scope.row.create_time}}</div>
          </template>
        </el-table-column>
        <el-table-column label="属性" align="center" min-width="120px">
          <template slot-scope="scope">
            <div>{{scope.row.nature|nature}}</div>
          </template>
        </el-table-column>


        <el-table-column label="操作" fixed="right" align="center" width="120px" class-name="small-padding">
          <template slot-scope="scope">
            <el-button v-if="scope.row.is_product===1" type="text" size="mini"
                       @click="handleUpdate(scope.row.id,'is_product')">取消产品经理
            </el-button>
            <el-button  v-if="scope.row.is_shop===1" v-waves :loading="scope.row.delete" type="text" size="mini"
                       @click="handleUpdate(scope.row.id,'is_shop')">取消店长
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
  import { GetDataByList, closeOrder, GetIdByDel,PostRoleByUpdate } from '@/api/wechatuser'
  import waves from '@/directive/waves'

  const defaultListQuery = {
    page: 1,
    limit: 10

  }
  export default {
    name: 'orderList',
    components: {},
    directives: {
      waves
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
            label: '设为店长',
            value: 1
          },
          {
            label: '产品经理',
            value: 2
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
      handleUpdate(id,field){
        var temp={
          ids:id,
          field,
          status:2
        }
        PostRoleByUpdate(temp).then(res=>{
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
            message: '最少选择一项',
            type: 'warning',
            duration: 1000
          })
          return
        }
        let ids = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id)
        }
        if (this.operateType === 1) {
          //设为店长
          var temp={
            ids,
            field:'is_shop',
            status:1

          }
          PostRoleByUpdate(temp).then(res=>{
            this.getList()
          })
        } else if (this.operateType === 2) {
          var temp={
            ids,
            field:'is_product',
            status:1

          }
          PostRoleByUpdate(temp).then(res=>{
            this.getList()
          })
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


