<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleFilter()"
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
          <el-form-item label="选择小区：">
            <el-select
              size="mini"
              clearable
              v-model="listQuery.community_id"
              placeholder="选择所属小区"
            >
              <el-option v-for="(item,index) in community" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="商品分类：">
            <el-select
              clearable
              size="mini"
              v-model="listQuery.category_id"
              placeholder="选择商品分类"
            >
              <el-option v-for="(item,index) in category" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>商家商品列表</span>

    </el-card>
    <div class="table-container">
      <el-table
        v-loading="listLoading"
        :key="tableKey"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"/>
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
            <img class="headimgurl" :src="scope.row.images_url"/>
          </template>
        </el-table-column>

        <el-table-column label="库存" align="center" min-width="120px">
          <template slot-scope="scope">
            {{scope.row.inventory}}
          </template>
        </el-table-column>

        <el-table-column label="成本价" align="center" min-width="120px">
          <template slot-scope="scope">
            {{scope.row.cost_price}}
          </template>
        </el-table-column>

        <el-table-column label="市场价" align="center" min-width="120px">
          <template slot-scope="scope">
            {{scope.row.line_price}}
          </template>
        </el-table-column>
        <el-table-column label="销售价" align="center" min-width="120px">
          <template slot-scope="scope">
            {{scope.row.price}}
          </template>
        </el-table-column>

        <el-table-column label="销量" align="center" min-width="120px">
          <template slot-scope="scope">
            {{scope.row.sales}}
          </template>
        </el-table-column>

        <el-table-column label="设为爆款" width="80px" align="center">
          <template slot-scope="scope">
          <span
            :class="{'el-icon-success text-green':scope.row.faddish == 1,'el-icon-error text-red':scope.row.faddish == 2}"
            @click="handleModifyFaddish(scope.$index,scope.row.id,scope.row.faddish)">
            {{ scope.row.faddish | statusFilter }}</span>
          </template>
        </el-table-column>

        <el-table-column label="是否允许自提" width="80px" align="center">
          <template slot-scope="scope">
          <span
            :class="{'el-icon-success text-green':scope.row.is_store == 1,'el-icon-error text-red':scope.row.is_store == 2}"
            @click="handleModifyis_store(scope.$index,scope.row.id,scope.row.is_store)">
            {{ scope.row.is_store | statusFilter }}</span>
          </template>
        </el-table-column>


        <el-table-column label="状态" width="80px" align="center">
          <template slot-scope="scope">
          <span
            :class="{'el-icon-success text-green':scope.row.status == 1,'el-icon-error text-red':scope.row.status == 2}"
            @click="handleModifyStatus(scope.$index,scope.row.id,scope.row.status)">
            {{ scope.row.status | statusFilter }}</span>
          </template>
        </el-table-column>

        <el-table-column label="是否轮播推荐" width="120px" align="center">
          <template slot-scope="scope">
          <span
            :class="{'el-icon-success text-green':scope.row.is_banner == 1,'el-icon-error text-red':scope.row.is_banner == 2}"
            @click="handleModifyBannder(scope.$index,scope.row.id,scope.row.is_banner)">
            {{ scope.row.is_banner | statusFilter }}</span>
          </template>
        </el-table-column>


        <el-table-column label="操作" fixed="right" align="center" width="120px" class-name="small-padding">
          <template slot-scope="scope">
            <el-tooltip content="编辑" placement="top">
              <router-link :to="'/goods/edit/'+scope.row.id">

                <el-button v-waves type="text" size="mini"
                > 编辑
                </el-button>
              </router-link>
            </el-tooltip>
            <el-button v-waves :loading="scope.row.delete" type="text" size="mini"
                       @click="handleDelete(scope.$index,scope.row.id)"> 删除
            </el-button>

          </template>
        </el-table-column>
      </el-table>


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
  import { change, changeAll, del, delAll, GetDataByList } from '@/api/goods'
  import waves from '@/directive/waves'
  import { getArrByKey, pickerOptions } from '@/utils'

  import { GetCommunityByall } from '@/api/community'

  import { GetCategory } from '@/api/category'

  export default {
    name: 'Roles',
    components: {},
    directives: {
      waves
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          2: '下架',
          1: '上架'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: null,
        selectedRows: null,
        listLoading: true,
        showSearch: false,
        listQuery: {
          page: 1,
          limit: 10,
          title: '',
          type: 1
        },
        category: [],
        community: [],
        buttonDisabled: true,
        deleting: false,
        pickerOptions: pickerOptions,
        currentIndex: -1
      }
    },
    watch: {},
    created() {
      GetCommunityByall().then(res => {
        this.community = res.data
      })
      GetCategory().then(res => {
        this.category = res.data
      })

      this.fetchList()
    },
    methods: {
      fetchList() {
        this.listLoading = true
        GetDataByList(this.listQuery).then(response => {
          this.list = response.data.data
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.fetchList()
      },
      handleFilterClear() {
        this.listQuery = {
          page: 1,
          limit: 10,
          title: ''
        }
        this.fetchList()
      },
      handleSizeChange(val) {
        this.listQuery.psize = val
        this.fetchList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.fetchList()
      },
      handleModifyStatus(index, id, status) {
        if (status === 2) {
          this.list[index]['status'] = 1
        } else {
          this.list[index]['status'] = 2
        }
        change(id, 'status', this.list[index]['status']).then(response => {
        })
      },
      handleModifyBannder(index, id, status) {
        if (status === 2) {
          this.list[index]['is_banner'] = 1
        } else {
          this.list[index]['is_banner'] = 2
        }
        change(id, 'is_banner', this.list[index]['is_banner']).then(response => {
        })
      },
      handleModifyis_store(index, id, status) {
        if (status === 2) {
          this.list[index]['is_store'] = 1
        } else {
          this.list[index]['is_store'] = 2
        }
        change(id, 'is_store', this.list[index]['is_store']).then(response => {
        })
      },
      handleModifyFaddish(index, id, status) {
        if (status === 2) {
          this.list[index]['faddish'] = 1
        } else {
          this.list[index]['faddish'] = 2
        }
        change(id, 'faddish', this.list[index]['faddish']).then(response => {
        })
      },
      handleSelectionChange(val) {
        if (val.length > 0) {
          this.buttonDisabled = false
        } else {
          this.buttonDisabled = true
        }
        this.selectedRows = val
      },
      handleCreate() {
        this.$refs.fromRoles.handleCreate()
      },
      handleUpdate(index, id) {
        this.currentIndex = index
        this.$refs.fromRoles.handleUpdate(id)
      },
      updateRow(temp) {
        if (this.currentIndex >= 0 && temp.id > 0) {
          this.list.splice(this.currentIndex, 1, temp)
        } else {
          if (this.list.length >= 10) {
            this.list.pop()
          }
          this.list.push(temp)
          this.total = this.total + 1
        }
        this.currentIndex = -1
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
      handleDeleteAll() {
        const _this = this
        if (this.selectedRows.length > 0) {
          this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _this.deleting = true
            const ids = getArrByKey(_this.selectedRows, 'id')
            const idstr = ids.join(',')
            delAll({ ids: idstr }).then(response => {
              if (response.status === 1) {
                const delindex = []
                _this.list.forEach(function(item, index, input) {
                  if (ids.indexOf(item.id) > -1) {
                    delindex.push(index)
                  }
                })
                for (let i = delindex.length - 1; i >= 0; i--) {
                  _this.list.splice(delindex[i], 1)
                }
                _this.total = _this.total - delindex.length
                _this.$message.success(response.msg)
              } else {
                _this.$message.error(response.msg)
              }
              _this.deleting = false
            }).catch((error) => {
              _this.deleting = false
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        } else {
          _this.$message.error('请选择要删除的数据')
        }
      },
      handleCommand(command) {
        const _this = this
        if (this.selectedRows.length > 0) {
          const ids = getArrByKey(this.selectedRows, 'id')
          const idstr = ids.join(',')
          changeAll({ val: idstr, field: 'status', value: command }).then(response => {
            if (response.status === 1) {
              _this.list.forEach(function(item, index, input) {
                if (ids.indexOf(item.id) > -1) {
                  _this.list[index]['status'] = command
                }
              })
              _this.$message.success(response.msg)
            } else {
              _this.$message.error(response.msg)
            }
          }).catch((error) => {
          })
        } else {
          _this.$message.error('请选择要操作的数据')
        }
      },
      handleBanner(command) {
        const _this = this
        if (this.selectedRows.length > 0) {
          const ids = getArrByKey(this.selectedRows, 'id')
          const idstr = ids.join(',')
          changeAll({ val: idstr, field: 'is_banner', value: command }).then(response => {
            if (response.status === 1) {
              _this.list.forEach(function(item, index, input) {
                if (ids.indexOf(item.id) > -1) {
                  _this.list[index]['is_banner'] = command
                }
              })
              _this.$message.success(response.msg)
            } else {
              _this.$message.error(response.msg)
            }
          }).catch((error) => {
          })
        } else {
          _this.$message.error('请选择要操作的数据')
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .text-red {
    color: red;
    cursor: pointer;
  }

  .text-green {
    color: green;
    cursor: pointer;
  }

  .headimgurl {
    width: 50px;
    height: 50px;
  }

  .text-red {
    color: red;
    cursor: pointer;
  }

  .text-green {
    color: green;
    cursor: pointer;
  }

  /*tab*/

  .cate-bar {
    overflow-y: auto; /*可滑动*/
    white-space: nowrap;
    display: -webkit-box;
    /*height 1.2rem;*/
    line-height: 1.2rem;
    position: fixed;
    top: 1rem;
    background: #fff;
    width: 100%;
    z-index: 100;
  }

  .bar-item {
    // width 17%;
    padding: 0 .1rem;
    text-align: center;
    color: #666;
    font-size: 0.4rem;
  }

  .bar-item span {
    width: 18%;
    text-align: center;
    color: #666;
    font-size: 14px;
    padding: 4px;
    border: 1px solid transparent;
    transition: color 1.2s, border 1.2s;
    -webkit-transition: color 0.7s, border 0.7s;
  }

  .cate-bar .bar-item.active span {
    padding: 4px;
    border-bottom: 2px solid #434343;
    color: #333;
    border-radius: 2px;
    font-size: 0.45rem;

  }

  .popup {
    padding-bottom: .8rem;
    .times {
      width: 10rem;
      margin-top: 0.5rem;
      height: 2rem;
      .times-title {
        text-align: center;
        font-size: 0.4rem;
        color: #333333;
      }
      .times-day {
        margin: 0 auto;
        width: 7rem;
        display: flex;
        justify-content: space-between;
        color: #999999;
        .day-start {
          text-align: center;
          width: 2.13rem;
          height: .6rem;
          padding-bottom: 0.05rem;
          color: #333333;
          font-size: 0.37rem;
          border-bottom: 1px solid rgba(220, 220, 220, 1);
        }
        .day-suspend {
          width: 0.6rem;
          height: 1px;
          background: #333333;
          margin-top: 0.4rem;
        }
        .day-end {
          text-align: center;
          width: 2.13rem;
          height: .6rem;
          padding-bottom: 0.1rem;
          color: #333333;
          font-size: 0.37rem;
          border-bottom: 1px solid rgba(220, 220, 220, 1);
        }
      }
    }
    .operation {
      width: 8.5rem;
      margin: 0.2rem auto 0;
      padding-bottom: .2rem;
      height: 1rem;
      display: flex;
      justify-content: space-between;
      font-size: 0.4rem;
      align-items: center;
      .open-on {
        width: 3.89rem;
        height: 1.09rem;
        line-height: 1.09rem;
        text-align: center;
        border: 1px solid rgba(234, 55, 86, 1);
        border-radius: 1rem;
        color: #EA3756;
        margin-top: 30px;
      }
      .on-ok {
        background: #EA3756;
        color: #ffffff;
      }
    }
  }

</style>


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


