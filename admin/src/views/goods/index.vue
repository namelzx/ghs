<template>
  <div class="app-container">
    <!-- 搜索 -->
    <div v-if="showSearch" class="filter-container">
      <el-form :inline="true" :model="listQuery" class="form-inline">
        <el-form-item label="">
          <el-input v-model="listQuery.title" placeholder="名称" clearable size="small"/>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="listQuery.status" placeholder="状态" clearable size="small">
            <el-option label="全部" value="-1"/>
            <el-option label="正常" value="1"/>
            <el-option label="禁用" value="0"/>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="listQuery.type" placeholder="商品所属类型" clearable size="small">
            <el-option label="全部" value="-1"/>
            <el-option label="平台" value="1"/>
            <el-option label="商家" value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button v-waves type="primary" icon="el-icon-search" size="small" @click="handleFilter">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-waves type="warning" icon="el-icon-refresh" size="small" @click="handleFilterClear">重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 操作 -->
    <el-row style="margin-bottom: 10px;">
      <el-col :xs="24" :sm="24" :lg="24">
        <el-tooltip content="刷新" placement="top">
          <el-button v-waves type="warning" icon="el-icon-refresh" circle @click="handleFilterClear"/>
        </el-tooltip>
        <el-tooltip content="添加" placement="top">
          <el-button v-waves type="success" icon="el-icon-plus" circle @click="handleCreate"/>
        </el-tooltip>
        <el-tooltip content="搜索" placement="top">
          <el-button v-waves type="primary" icon="el-icon-search" circle @click="showSearch = !showSearch"/>
        </el-tooltip>
        <el-tooltip content="删除" placement="top">
          <el-button v-waves :loading="deleting" :disabled="buttonDisabled" type="danger" icon="el-icon-delete" circle
                     @click="handleDeleteAll()"/>
        </el-tooltip>
        <el-tooltip content="更多" placement="top">
          <el-dropdown trigger="click" placement="bottom" style="margin-left: 10px;" @command="handleCommand">
            <el-button :disabled="buttonDisabled" type="Info" circle>
              <i class="el-icon-more"/>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">设为上架</el-dropdown-item>
              <el-dropdown-item command="2">设为下架</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-tooltip>

      </el-col>
    </el-row>
    <!-- 表格 -->
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
          <span >{{ scope.row.name }}</span>
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

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]"
                     :page-size="listQuery.psize" :total="total" background
                     layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"/>
    </div>

  </div>
</template>

<script>
  import { change, changeAll, del, delAll, GetDataByList } from '@/api/goods'
  import waves from '@/directive/waves'
  import { getArrByKey, pickerOptions } from '@/utils'

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
          title: ''
        },
        buttonDisabled: true,
        deleting: false,
        pickerOptions: pickerOptions,
        currentIndex: -1
      }
    },
    watch: {},
    created() {
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
    position :fixed;
    top: 1rem;
    background :#fff;
    width: 100%;
    z-index :100;
  }

  .bar-item {
    // width 17%;
    padding :0 .1rem;
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

