<template>
  <el-dialog width="60%" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px"
             style="width: 100%; height: 50vh;overflow-y: scroll;">
      <el-form-item label="岗位名称" prop="title">
        <el-input v-model="temp.title" clearable/>
      </el-form-item>
      <!--<el-form-item label="状态">-->
      <!--<el-radio-group v-model="temp.status">-->
      <!--<el-radio :label="1">正常</el-radio>-->
      <!--<el-radio :label="0">禁用</el-radio>-->
      <!--</el-radio-group>-->
      <!--</el-form-item>-->
      <div class="md" v-loading="loading">
        <el-collapse v-model="activeNames">
          <!--{{checkList}}-->
          <!--{{rolesList}}-->
          <el-checkbox-group v-model="checkList">
            <!--顶级目录-->
            <el-collapse-item v-for="(item,index) in getPremiss" :name="item.name">
        <span class="collapse-title" slot="title">
             <el-checkbox v-if="item.title" :label="item.id">{{item.title}}</el-checkbox></span>
              <!--二级目录-->
              <div class="ch-2" v-for="(citem,cindex) in item.children">
                <el-checkbox v-if="citem.title" :label="citem.id">{{citem.title}}</el-checkbox>
                <!--二级目录权限-->
                <el-checkbox-group v-if="citem.roles" v-model="rolesList">
                  <div class="o-2-or" v-if="citem.roles" v-for="(oitem,oindex) in citem.roles">
                    <div class="or-title">
                      <el-checkbox>
                        {{oitem.title}}
                      </el-checkbox>
                    </div>
                    <div class="or-child-item">
                      <div class="or-child" v-for="(toitem,toindex) in oitem.children">
                        <el-checkbox :label="toitem.id"> {{toitem.title}}</el-checkbox>
                      </div>
                    </div>
                  </div>
                </el-checkbox-group>
                <div v-if="citem.children" v-for="(titem,tiindex) in citem.children">
                  <el-checkbox :label="titem.id">{{titem.title}}</el-checkbox>
                </div>
              </div>

              <!--<div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>-->
            </el-collapse-item>
          </el-checkbox-group>
        </el-collapse>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button :loading="btnLoading" type="primary" @click="saveData()">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { getListAll } from '@/api/rules'
  import { getinfo, save } from '@/api/ol'
  import tree from '@/utils/tree'

  export default {
    name: 'RolesForm',
    data() {
      return {
        loading: true,
        checkList: [],
        rolesList: [],
        activeNames: undefined,
        btnLoading: false,
        ruleList: [],
        checked: true,
        temp: {
          id: 0,
          title: '',
          status: 1,
          rules: ''
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '添加'
        },
        rules: {
          title: [{ required: true, message: '名称必填', trigger: 'blur' }]
        },
        defaultChecked: [],
        defaultProps: {
          children: 'children',
          label: 'title'
        }
      }
    },
    computed: {
      getRulesList() {
        return tree.listToTreeMulti(this.ruleList)
      },
      getPremiss() {
        let data = tree.listToTreeMulti(this.ruleList)
        for (let i = 0; i < data.length; i++) {

          // let children = data[i].children
          // for (let j = 0; j < children.length; j++) {
          //   // console.log(  children[j].children)
          //   //
          //   if (children[j].id === 67) {
          //     children[j].roles = []
          //     children[j].roles[0] = {
          //       title: '全部订单',
          //       children: [
          //         {
          //           id: 'o-' + children[j].id + '-' + '1',
          //           title: '查询'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '2',
          //           title: '删除'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '3',
          //           title: '新增'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '4',
          //           title: '导出'
          //         }
          //         ,
          //         {
          //           id: 'o-' + children[j].id + '-' + '5',
          //           title: '修改'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '6',
          //           title: '回访查看'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '7',
          //           title: '回访编辑'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '8',
          //           title: '售后查看'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '9',
          //           title: '售后编辑'
          //         }, {
          //           id: 'o-' + children[j].id + '-' + '10',
          //           title: '驳回'
          //         }
          //
          //       ]
          //     }
          //     children[j].roles[1] = {
          //       title: '环节订单',
          //       children: [
          //         {
          //           id: 'o-h-1',
          //           title: '待处理'
          //         },
          //         {
          //           id: 'o-h-2',
          //           title: '待确认(业务员)'
          //         },
          //         {
          //           id: 'o-h-3',
          //           title: '待确认(门店)'
          //         },
          //         {
          //           id: 'o-h-4',
          //           title: '待安装'
          //         },
          //         {
          //           id: 'o-h-5',
          //           title: '已安装'
          //         },
          //         {
          //           id: 'o-h-6',
          //           title: '财审1'
          //         },
          //         {
          //           id: 'o-h-7',
          //           title: '财审2'
          //         },
          //         {
          //           id: 'o-h-8',
          //           title: '待结算'
          //         }
          //       ]
          //     }
          //   }
          //   if (children[j].id === 68) {
          //     children[j].roles = []
          //     children[j].roles[0] = {
          //       title: ' ',
          //       children: [
          //         {
          //           id: 'o-' + children[j].id + '-' + '1',
          //           title: '查询'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '2',
          //           title: '导出'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '3',
          //           title: '新增'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '4',
          //
          //           title: '删除'
          //         }
          //         ,
          //         {
          //           id: 'o-' + children[j].id + '-' + '5',
          //           title: '核销'
          //         }
          //       ]
          //     }
          //   }
          //
          //   if (children[j].id === 69) {
          //     children[j].roles = []
          //     children[j].roles[0] = {
          //       title: ' ',
          //       children: [
          //         {
          //           id: 'o-' + children[j].id + '-' + '1',
          //           title: '接触绑定'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '2',
          //           title: '更换绑定'
          //         }
          //       ]
          //     }
          //   }
          //
          //   if (children[j].id === 70) {
          //     children[j].roles = []
          //     children[j].roles[0] = {
          //       title: '安装单',
          //       children: [
          //         {
          //           id: 'o-' + children[j].id + '-' + '1',
          //           title: '查询'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '2',
          //           title: '导出'
          //         }
          //       ]
          //     }
          //     children[j].roles[1] = {
          //       title: '营销单',
          //       children: [
          //         {
          //           id: 'o-' + children[j].id + 'h-1',
          //           title: '查询'
          //         },
          //         {
          //           id: 'o-' + children[j].id + 'h-2',
          //           title: '导出'
          //         }
          //
          //       ]
          //     }
          //   }
          //   //门店管理
          //   if (children[j].id === 92) {
          //     children[j].roles = []
          //     children[j].roles[0] = {
          //       title: ' ',
          //       children: [
          //         {
          //           id: 'o-' + children[j].id + '-' + '1',
          //           title: '查询'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '2',
          //           title: '导出'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '3',
          //           title: '解封同步'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '4',
          //           title: '拉黑'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '5',
          //           title: '拉白'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '6',
          //           title: '改基本信息'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '7',
          //           title: '修改绑定'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '8',
          //           title: '门店信息'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '9',
          //           title: '资产营收'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '10',
          //           title: '安装订单'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '11',
          //           title: '营销订单'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '12',
          //           title: '用户评价'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '13',
          //           title: '优惠卷'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '14',
          //           title: '项目'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '15',
          //           title: '抵扣卷'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '16',
          //           title: '产品'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '17',
          //           title: '动态'
          //         }
          //       ]
          //     }
          //   }
          //   //门店审核
          //   if (children[j].id === 72) {
          //     children[j].roles = []
          //     children[j].roles[0] = {
          //       title: ' ',
          //       children: [
          //         {
          //           id: 'o-' + children[j].id + '-' + '1',
          //           title: '查询'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '2',
          //           title: '导出'
          //         }
          //       ]
          //     }
          //   }
          //   //费用管理
          //   if (children[j].id === 96) {
          //     children[j].roles = []
          //     children[j].roles[0] = {
          //       title: '全部订单',
          //       children: [
          //         {
          //           id: 'o-' + children[j].id + '-' + '1',
          //           title: '查询'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '2',
          //           title: '删除'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '3',
          //           title: '新增'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '4',
          //           title: '导出'
          //         }
          //         ,
          //         {
          //           id: 'o-' + children[j].id + '-' + '5',
          //           title: '修改'
          //         },
          //       ]
          //     }
          //     children[j].roles[1] = {
          //       title: '环节订单',
          //       children: [
          //         {
          //           id: 'o-'+children[j].id +'-h-1',
          //           title: '待初审'
          //         },
          //         {
          //           id: 'o-'+children[j].id +'-h-2',
          //           title: '待财审1'
          //         },
          //         {
          //           id: 'o-'+children[j].id +'-h-3',
          //           title: '待财审2'
          //         },
          //         {
          //           id: 'o-'+children[j].id +'-h-4',
          //           title: '待财审3'
          //         },
          //         {
          //           id: 'o-'+children[j].id +'-h-5',
          //           title: '待结算'
          //         },
          //       ]
          //     }
          //   }
          //   //运营费用
          //
          //   if (children[j].id === 97) {
          //     children[j].roles = []
          //     children[j].roles[0] = {
          //       title: '全部订单',
          //       children: [
          //         {
          //           id: 'o-' + children[j].id + '-' + '1',
          //           title: '查询'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '2',
          //           title: '删除'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '3',
          //           title: '新增'
          //         },
          //         {
          //           id: 'o-' + children[j].id + '-' + '4',
          //           title: '导出'
          //         }
          //         ,
          //         {
          //           id: 'o-' + children[j].id + '-' + '5',
          //           title: '修改'
          //         },
          //       ]
          //     }
          //     children[j].roles[1] = {
          //       title: '环节订单',
          //       children: [
          //         {
          //           id: 'o-'+children[j].id +'-h-1',
          //           title: '待初审'
          //         },
          //         {
          //           id: 'o-'+children[j].id +'-h-2',
          //           title: '待财审1'
          //         },
          //         {
          //           id: 'o-'+children[j].id +'-h-3',
          //           title: '待财审2'
          //         },
          //         {
          //           id: 'o-'+children[j].id +'-h-4',
          //           title: '待财审3'
          //         },
          //         {
          //           id: 'o-'+children[j].id +'-h-5',
          //           title: '待结算'
          //         },
          //       ]
          //     }
          //   }
          // }

        }
        return data
        // return tree.listToTreeMulti(this.ruleList)
      }
    },
    watch: {
      dialogFormVisible: function() {
        this.resetTemp()
      }
    },
    created() {
      this.getRules()
    },
    destroyed() {
    },
    methods: {
      getRules() {
        getListAll().then(response => {

          this.ruleList = response.data
        })
      },
      resetTemp() {
        this.temp = {
          id: 0,
          title: '',
          status: 1,
          rules: ''
        }
      },
      checkHandle(data) {
        const halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys().join(',')
        const checkedKeys = this.$refs.tree.getCheckedKeys().join(',')
        if (halfCheckedKeys.length && checkedKeys.length) {
          this.temp.rules = halfCheckedKeys + ',' + checkedKeys
        } else if (halfCheckedKeys.length && checkedKeys.length === 0) {
          this.temp.rules = halfCheckedKeys
        } else if (halfCheckedKeys.length === 0 && checkedKeys.length) {
          this.temp.rules = checkedKeys
        } else {
          this.temp.rules = ''
        }
      },
      handleCreate() {
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.currentIndex = -1
        this.loading = false
        // this.$refs.tree.setCheckedKeys([])
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleUpdate(id) {
        this.loading = true
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        const _this = this
        getinfo(id).then(response => {
          if (response.status === 1) {
            _this.checkList = []
            _this.rolesList = []
            _this.temp.id = response.data.id
            _this.temp.title = response.data.title
            _this.temp.status = response.data.status
            _this.temp.rules = response.data.rules

            if (response.data.rules !== null) {

              let rules = response.data.rules.split(',')
              let arr = []
              for (let i = 0; i < rules.length; i++) {
                arr[i] = parseInt(rules[i])
              }
              _this.checkList = arr
            }

            if (response.data.btn !== null) {
              let btn = response.data.btn.split(',')
              let btnarr = []

              for (let i = 0; i < btn.length; i++) {
                btnarr[i] = btn[i]
              }
              _this.rolesList = btnarr

            }
            this.loading = false

          }
        })
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      saveData() {
        this.btnLoading = true
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const _this = this
            const d = this.temp
            this.temp.rules = this.checkList.join(',')
            this.temp.btn = this.rolesList.join(',')
            save(d).then(response => {
              if (response.status === 1) {
                if (!d.id) {
                  d.id = response.data.id
                }
                this.$emit('updateRow', d)
                _this.dialogFormVisible = false
                _this.$message.success(response.msg)
              } else {
                _this.$message.error(response.msg)
              }
              _this.btnLoading = false
            }).catch((error) => {
              this.btnLoading = false
            })
          } else {
            this.btnLoading = false
          }
        })
      }
    }
  }
</script>


<style lang="scss" scoped>
  .collapse-title {
    flex: 1 0 90%;
    order: 1;
  }

  .el-collapse-item__header {
    flex: 1 0 auto;
    order: -1;
  }

  .md > > > .el-icon-arrow-right:before {
    content: "\E60E";
  }

  .md {
    .ch-2 {
      margin-left: 10%;
      display: flex;
      border-bottom: 1px solid #e6ebf5;
      .el-checkbox {
        width: 74px;
      }
      .o-2-or {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        font-size: 12px !important;
        .or-title {
          width: 15%;
          .el-checkbox__input {
            display: none !important;
          }
        }
        .or-child-item {
          width: 75%;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          .or-child {
            width: 25%;
          }
        }
        .el-checkbox__label {
          padding-left: 3px;
          padding-right: 10px;
          font-size: 12px;
        }
      }
    }
  }

  .or-title > > > .el-checkbox__inner {
    display: none;
  }

  .or-title > > > .el-checkbox__input {
    display: none;
  }

  .or-title > > > .el-checkbox__label {
    font-size: 12px !important;
  }

  .md > > > .el-checkbox__label {
    font-size: 12px !important;
    padding-left: 2px;
    padding-right: 10px;
  }

  .el-collapse-item__header.is-active {
    border-bottom: 1px solid #e6ebf5;
  }

  .el-checkbox-group {
    width: 100%;
  }


</style>
