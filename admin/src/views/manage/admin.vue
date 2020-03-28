<template>
  <div class="app-container">
    <!--<div class="tab">-->
      <!--<el-switch-->
        <!--v-model="type_tab"-->
        <!--active-text="管理员"-->
        <!--inactive-text="业务员">-->
      <!--</el-switch>-->
    <!--</div>-->

    <div>

      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="管理员" name="first">

          <adminInit></adminInit>
        </el-tab-pane>
        <el-tab-pane label="业务员" name="second">

          <salesman></salesman>
        </el-tab-pane>


      </el-tabs>
    </div>

  </div>
</template>

<script>
  import { change, changeAll, del, delAll, getList } from '@/api/admin'
  import waves from '@/directive/waves'
  import { getArrByKey, parseTime, pickerOptions } from '@/utils'
  import openWindow from '@/utils/openWindow'

  import adminInit from './account/administrator'

  import salesman from './account/salesman'

  export default {
    name: 'Admin',
    components: { adminInit, salesman },
    directives: {
      waves
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          0: '禁用',
          1: '正常'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        type_tab: false,
        activeName: 'first'

      }
    },

    watch: {
      dateTime: function(val) {
        this.listQuery.startTime = val[0]
        this.listQuery.endTime = val[1]
      }
    },
    created() {
      this.fetchList()
    },

    methods: {

      fetchList() {
        this.listLoading = true
        getList(this.listQuery).then(response => {
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
          psize: 10,
          isEnabled: '-1',
          userName: '',
          phone: '',
          realName: '',
          startTime: '',
          endTime: ''
        }
        this.dateTime = ''
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
      handleModifyStatus(index, id, isEnabled) {
        this.list[index]['isEnabled'] = 1 - isEnabled
        change(id, 'isEnabled', 1 - isEnabled).then(response => {
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
      handleImg(img) {
        openWindow(img, '图片预览', '500', '400')
      },
      handleCreate() {
        this.$refs.fromAdmin.handleCreate()
      },
      handleUpdate(index, id) {
        this.currentIndex = index
        this.$refs.fromAdmin.handleUpdate(id)
      },
      updateRow(temp) {
        if (this.currentIndex >= 0 && temp.id > 0) {
          this.list.splice(this.currentIndex, 1, temp)
        } else {
          if (this.list.length >= 10) {
            this.list.pop()
          }
          this.list.unshift(temp)
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
          changeAll({ val: idstr, field: 'isEnabled', value: command }).then(response => {
            if (response.status === 1) {
              _this.list.forEach(function(item, index, input) {
                if (ids.indexOf(item.id) > -1) {
                  _this.list[index]['isEnabled'] = command
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
</style>
