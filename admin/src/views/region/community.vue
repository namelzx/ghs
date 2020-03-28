<template>
  <div class="app-container">
    <!-- 搜索 -->
    <div v-if="showSearch" class="filter-container">
      <el-form :inline="true" :model="listQuery" class="form-inline">
        <el-form-item label="">
          <el-input v-model="listQuery.title" placeholder="名称" clearable size="small"/>
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


      </el-col>
    </el-row>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"

    >


      <el-table-column label="小区名称"       fixed="left"
                       min-width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="所处城市"       fixed="left"
                       min-width="150px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.city">{{ scope.row.city.name }}</span>
          <span v-else>城市未选择</span>
        </template>
      </el-table-column>


      <!--| parseTime('{y}-{m}-{d} {h}:{i}')-->
      <el-table-column label="小区详细地址" min-width="80px"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.location }}</span>
        </template>
      </el-table-column>

      <el-table-column label="小区状态" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status |statusFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right"
                       align="center" min-width="150">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleUpdate(scope.row)">
            修改
          </el-button>

          <el-button type="text" size="mini" @click="handleModifyStatus(scope.row,'deleted')">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px"
               style="width: 400px; margin-left:50px;">


        <el-form-item label="小区名称" >
          <el-input v-model="temp.name"/>
        </el-form-item>



        <el-form-item label="详细地址" >
          <el-input v-model="temp.location" placeholder="请填写详细地址,方便定位"/>
        </el-form-item>

        <el-form-item label="是否启用">

          <el-select v-model="temp.city_id" class="filter-item" placeholder="Please select">
            <el-option v-for="(item,index) in community" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item  label="小区图片:">
          <Upload :image-url="temp.images_url" @showParentComp="HandelImages"/>

        </el-form-item>



        <el-form-item label="排序" >
          <el-input v-model="temp.sort"/>
        </el-form-item>
        <el-form-item label="是否启用">

          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="(item,index) in StatusMap" :key="item.index" :label="item.name" :value="item.index" />
          </el-select>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"/>
        <el-table-column prop="pv" label="Pv"/>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {PostDataBySave, GetIdByDel, GetDataByList,GetCity} from '@/api/community'
  import waves from '@/directive/waves' // waves directive
  import {parseTime} from '@/utils'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import Upload from '@/components/Upload/CoverImage' // secondary package based on el-pagination


  // arr to obj, such as { CN : "China", US : "USA" }


  export default {
    name: 'ComplexTable',
    components: {Pagination, Upload},
    directives: {waves},
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: '启用',
          2: '禁用',
          deleted: 'danger'
        }
        return statusMap[status]
      },
      typeFilter(type) {
        return calendarTypeKeyValue[type]
      }
    },
    data() {
      return {
        showSearch:false,
        tableKey: 0,
        list: [],
        total: 0,
        listLoading: true,
        community:[],
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        importanceOptions: [1, 2, 3],
        sortOptions: [{label: 'ID Ascending', key: '+id'}, {label: 'ID Descending', key: '-id'}],
        statusOptions: ['published', 'draft', 'deleted'],
        showReviewer: false,
        temp: {
          id: undefined,
          name: '',
          sort: 0,
          ico: '',
          status: 2,
          status_hm: 2,
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },

        StatusMap: [
          {
            index:2,
            name:'禁用'
          },
          {
            index:1,
            name:'启用'
          }
        ],
        HomeMap: [
          {
            index:2,
            name:'不展示'
          },
          {
            index:1,
            name:'展示'
          }
        ],
        dialogPvVisible: false,
        pvData: [],
        rules: {
          name: [{required: true, message: '名称必须输入', trigger: 'blur'}]
        },
        downloadLoading: false
      }
    },
    created() {
      this.getList()
      GetCity().then(res=>{
this.community=res.data
      })

    },
    methods: {
      HandelImages(e) {
        this.temp.images_url = e
      },
      handelIco(e) {
        console.log(e)
        this.temp.ico = e
      },
      getList() {
        this.listLoading = true
        GetDataByList(this.listQuery).then(response => {
          this.list = response.data.data
          console.log(this.list)
          this.total = response.data.total

          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleModifyStatus(row, status) {
        GetIdByDel(row.id).then(res=>{
          var index=this.list.indexOf(row)
          this.list.splice(index, 1);
          this.$message({
            type: "success",
            message:  res.msg
          });
        })

      },


      handleCreate() {
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            PostDataBySave(this.temp).then(res => {
              this.list.unshift(res.data)
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: 'Created Successfully',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      handleUpdate(row) {
        this.temp =row // copy obj
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)

            PostDataBySave(tempData).then(() => {
              for (const v of this.list) {
                if (v.id === this.temp.id) {
                  const index = this.list.indexOf(v)
                  this.list.splice(index, 1, this.temp)
                  break
                }
              }
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: 'Update Successfully',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      handleDelete(row) {
        this.$notify({
          title: 'Success',
          message: 'Delete Successfully',
          type: 'success',
          duration: 2000
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      },
      handleFetchPv(pv) {
        fetchPv(pv).then(response => {
          this.pvData = response.data.pvData
          this.dialogPvVisible = true
        })
      },

    }
  }
</script>
