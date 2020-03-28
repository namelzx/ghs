<template>
  <div >

    <!--<wxlogin style="margin-left: 25px" :href="wx.href" :state="wx.state" :appid="wx.appid" :scope="wx.scope"-->
             <!--:redirect_uri="wx.redirect_uri"></wxlogin>-->
    <div class="form filter-container">
      <el-form :inline="true" :model="listQuery" class="form-inline">
        <el-form-item label="姓名:">
          <el-input size="mini" v-model="listQuery.realName" clearable/>

        </el-form-item>
        <el-form-item label="手机号:">
          <el-input size="mini" v-model="listQuery.phone" clearable/>

        </el-form-item>

        <el-form-item label="微信昵称:">
          <el-input size="mini" v-model="listQuery.nickname" clearable/>

        </el-form-item>
        <el-form-item>
          <el-button type="primary"  size="small" @click="handleFilter">搜索</el-button>
          <el-button type="primary"  size="small" @click="handleCreate">新增</el-button>
          <el-button type="primary" size="small" @click="handleCreate">更新微信</el-button>
          <el-button type="primary"  size="small" @click="handleCreate">修改绑定</el-button>
        </el-form-item>
      </el-form>


    </div>

    <el-table
      :data="list"
      border
      stripe
      v-loading="listLoading"

      style="width: 100%;"
    >
      <!--<el-table-column type="selection" width="55"/>-->

      <el-table-column label="姓名" min-width="100px" align="center">
        <template slot-scope="scope">
          <span >{{ scope.row.realName}}</span>

        </template>
      </el-table-column>
      <el-table-column label="手机号" min-width="100px" align="center">
        <template slot-scope="scope">
          <span v-if=" scope.row">{{ scope.row.phone}}</span>
        </template>
      </el-table-column>

      <el-table-column label="微信昵称" min-width="100px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.wechat">{{ scope.row.wechat.nickname }}</span>
          <span v-else>尚未绑定微信</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="150px" class-name="small-padding">
        <template slot-scope="scope">
          <el-tooltip content="编辑" placement="top">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">
              编辑
            </el-button>


          </el-tooltip>
          <el-tooltip content="删除" placement="top">


            <el-button type="warning" size="mini" plain @click="handleDelete(scope.row)">删除</el-button>

          </el-tooltip>

        </template>
      </el-table-column>
    </el-table>

    <!-- 表格 -->

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]"
                     :page-size="listQuery.psize" :total="total" background
                     layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"/>
    </div>


    <el-dialog
      :title="postStatusText[StatusText]"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div class="dialog-main">

        <el-form ref="form" :model="postFrom" label-width="80px">

          <div class="main-tag">

            <el-row :gutter="20">
              <el-col>
                <el-form-item label="姓名:">
                  <el-input size="mini" v-model="postFrom.realName"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="手机号:">
                  <el-input size="mini" v-model="postFrom.phone"></el-input>
                </el-form-item>
              </el-col>

              <el-col>
                <el-form-item label="openid:">
                  <el-input size="mini" v-model="postFrom.openid"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

          </div>
        </el-form>


      </div>
      <span slot="footer" class="dialog-footer">
            <el-button type="primary" size="mini"
                       @click="StatusText==='create'?createData():updateData()">保存</el-button>

    <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
  </span>
    </el-dialog>

  </div>

</template>

<script>
  // import InputForm from '@components/FormInput/index'
  import InputForm from '@/components/FormInput/index'
  import wxlogin from 'vue-wxlogin';

  import {  del, getList, PostDataPByAdd } from '@/api/salesman'
  import waves from '@/directive/waves'
  import { getArrByKey, pickerOptions } from '@/utils'
  export default {
    name: 'audit',
    data() {
      return {
        wx:{
          appid:'wx430216ed10988964',
          scope:'snsapi_userinfo',
          redirect_uri:'http://aystest.10huisp.com/api/shop//user/callback',
          state:'state',
          theme:'black',
          href:'http://aystest.10huisp.com'
        },
        form: {},
        input: '',
        tableKey: 0,
        rejectedFrom: {
          shop_id: undefined,
          desc: undefined
        },
        postStatusText: {
          create: '业务员新增',
          edit: '业务员修改'
        },
        StatusText: 'create',
        postFrom: {},
        listLoading: true,
        total: 0,
        checkList: [],
        dialogVisible: false,
        innerVisible: false,

        listQuery: {
          page: 1,
          limit: 10,
          status: '1',
          title: ''

        },
        classlist:[],
        list: []

      }
    },
    components: {
      InputForm,
      waves,
      wxlogin
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
          status: '1',
          title: ''
        }
        this.fetchList()
      },
      //关闭
      handleClose() {
        this.dialogVisible=!this.dialogVisible
      },

      handleSizeChange(val) {
        this.listQuery.psize = val
        this.fetchList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.fetchList()
      },

      handleCreate() {
        this.postFrom={
          title:'',
          class_id:'',
          quality_time:'',
          one:'',
          tow:''
        }
        this.dialogVisible = !this.dialogVisible
        this.StatusText = 'create'
      },
      createData() {
        PostDataPByAdd(this.postFrom).then(res => {
          this.dialogVisible = !this.dialogVisible
          this.fetchList()

        })
      },
      handleUpdate(row) {
        console.log(row)
        this.StatusText = 'edit'
        this.dialogVisible = !this.dialogVisible
        this.postFrom=row

      },
      updateData() {
        PostDataPByAdd(this.postFrom).then(res => {
          this.dialogVisible = !this.dialogVisible

        })

      },
      handleDelete(row) {
        const _this = this
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const index= _this.list.indexOf(row)
          del(row.id).then(response => {
            if (response.status === 1) {
              _this.list.splice(index, 1)
              _this.total = _this.total - 1
              _this.$notify.success(response.msg)
            } else {
              _this.$notify.error(response.msg)
            }
          }).catch((error) => {
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }

    }
  }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>


  .cel-input__inner{
    width: 200px !important;
  }
  .form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

  }

  .el-form-item {
    margin-bottom: 0px;
  }

  .dialog-main {
    label {
      font-weight: 500;
    }

    .el-form-list {
      float: left;
      margin-right: 20px;

      img {
        width: 100px;
        height: 100px;
        border-radius: 10%;
      }

    }

    .license {
      width: 100px;
      height: 100px;
      border-radius: 10%;
    }
  }

</style>
