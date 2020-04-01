<template>
  <div class="createPost-container">
    <!--图片选择-->


    <el-form ref="postForm" :model="postForm" class="form-container">

      <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          保存
        </el-button>
      </sticky>
      <div class="createPost-main-container">
        <div class="main-bg">
          <divider title="基本信息"/>
          <div>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label-width="100px" label="商品名称:">
                  <el-input
                    size="mini"
                    v-model="postForm.name"
                    :rows="1"
                    autosize
                    placeholder="请输入商品名称"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label-width="100px" label="销售价:">
                  <el-input
                    size="mini"
                    v-model="postForm.price"
                    :rows="1"
                    autosize
                    placeholder="请输入销售价"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label-width="100px" label="团长佣金:">
                  <el-input
                    size="mini"
                    v-model="postForm.head_price"
                    :rows="1"
                    autosize
                    placeholder="请输入团长佣金(默认0)"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label-width="100px" label="产品经理佣金:">
                  <el-input
                    size="mini"
                    v-model="postForm.manager_price"
                    :rows="1"
                    autosize
                    placeholder="输入业务经理佣金(默认0)"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label-width="100px" label="销量:">
                  <el-input
                    size="mini"
                    v-model="postForm.sales"
                    :rows="1"
                    autosize
                    placeholder="输入销量(默认0)"
                  />
                </el-form-item>
              </el-col>
            </el-row>


            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label-width="100px" label="成本价:">
                  <el-input
                    size="mini"
                    v-model="postForm.cost_price"
                    :rows="1"
                    autosize
                    placeholder="请输入成本价 (默认0)"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label-width="100px" label="市场价:">
                  <el-input
                    size="mini"
                    v-model="postForm.line_price"
                    :rows="1"
                    autosize
                    placeholder="请输入市场价(默认0)"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label-width="100px" label="库存:">
                  <el-input
                    size="mini"
                    v-model="postForm.inventory"
                    :rows="1"
                    autosize
                    placeholder="请输入市场价 (默认0,低于1将会下架)"
                  />
                </el-form-item>
              </el-col>
            </el-row>


            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label-width="100px" label="所属分类:">
                  <el-select
                    size="mini"
                    prod="category_id"
                    v-model="postForm.category_id"
                    placeholder="选择所属分类"

                  >
                    <el-option v-for="(item,index) in category" :key="item.id" :label="item.name" :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>

            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label-width="100px" label="选择所属小区:">
                  <el-select
                    size="mini"
                    prod="category_id"
                    v-model="postForm.community_id"
                    placeholder="选择所属小区"

                  >
                    <el-option v-for="(item,index) in community" :key="item.id" :label="item.name" :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>

            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label-width="100px" label="选择所属经理:">
                  <el-select
                    size="mini"
                    prod="category_id"
                    v-model="postForm.product_id"
                    placeholder="选择所属经理"

                  >
                    <el-option v-for="(item,index) in product" :key="item.id" :label="item.nickName" :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>

            </el-row>





            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item label-width="100px" label="商品特色:">
                  <el-input
                    size="mini"
                    v-model="postForm.sellpoint"
                    :rows="1"
                    type="textarea"
                    class="article-textarea"
                    autosize
                    placeholder="输入商品特色"
                  />
                </el-form-item>


              </el-col>
            </el-row>


          </div>
        </div>

        <div class="main-bg">
          <divider title="商品素材"/>
          <div>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label-width="100px" label="商品图片:">
                  <CoverImage :image-url="postForm.images_url" @showParentComp="HandelImages"/>

                </el-form-item>
              </el-col>

            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label-width="100px" label="爆款推荐图:">
                  <CoverImage :image-url="postForm.hot_img" @showParentComp="HandelHont"/>

                </el-form-item>
              </el-col>

            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label-width="100px" label="主图视频:">
                  <uploadVideo :imageUrl="postForm.videosrc" @handelFile="handelFile"></uploadVideo>
                </el-form-item>
              </el-col>

            </el-row>

            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label-width="100px" label="单品图片列表:">
                  <ListImage :list="postForm.img_list" @handelRemove="handelRemove"
                             @handelFile="handelImglist"></ListImage>
                </el-form-item>
              </el-col>

            </el-row>


            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item label-width="100px" label="商品轮播图">
                  <ListImage :list="postForm.img_banner" @handelRemove="handelbannerRemove"
                             @handelFile="handelbanner"></ListImage>
                </el-form-item>
              </el-col>

            </el-row>
          </div>

        </div>

      </div>
    </el-form>
  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  import Upload from '@/components/Upload/SukImages'
  import uploadVideo from '@/components/Upload/uploadVideo'

  import SukImages from '@/components/Upload/SukImages'

  import CoverImage from '@/components/Upload/CoverImage'

  import ListImage from '@/components/Upload/ListImages'

  import Sticky from '@/components/Sticky' // 粘性header组件
  import { validURL } from '@/utils/validate'
  import { fetchArticle } from '@/api/article'
  import { searchUser } from '@/api/remote-search'
  import Warning from './Warning'
  import Divider from './Dropdown/Divider'
  import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'

  import { GetCategoryIdByItems, GetIdByDetails, PostDataBySave } from '@/api/goods'

  import { GetCommunityByall } from '@/api/community'

  import { GetCategory } from '@/api/category'

  import { GetLibrary } from '@/api/common'

  const defaultForm = {
    name: '', // 商品名称
    images_url: '',// 封面图
    img_list: [],
    img_banner: []

  }

  export default {
    name: 'ArticleDetail',
    components: {
      uploadVideo,
      Divider,
      Tinymce,
      Upload,

      Sticky,
      Warning,
      CommentDropdown,
      PlatformDropdown,
      SourceUrlDropdown,
      CoverImage,
      ListImage,
      SukImages
    },
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: '',
          2: 'info'
        }
        return statusMap[status]
      }
    },
    data() {

      return {
        product:[],
        videosrc: '',
        ruleall: [],
        photoVisible: false,//获取图片库
        banner: [],

        category: [],
        postForm: {},
        loading: false,
        userListOptions: [],
        brand: [],
        img_list: [],
        tempRoute: {},
        photo: [],
        community:[],

      }
    },
    computed: {
      displayTime: {
        get() {
          return (+new Date(this.postForm.display_time))
        },
        set(val) {
          this.postForm.display_time = new Date(val)
        }
      }
    },
    created() {
      GetCommunityByall().then(res=>{
        this.community=res.data
      })
      this.postForm.img_list = []
      this.postForm.img_banner = []
      this.postForm = Object.assign({}, this.postForm)
      if (this.isEdit) {
        const id = this.$route.params && this.$route.params.id
        this.fetchData(id)
      }
      console.log(this.postForm)
      GetCategory().then(res => {
        this.category = res.data
      })

      this.tempRoute = Object.assign({}, this.$route)
    },
    methods: {

      handelbannerRemove(e) {
        this.postForm.img_banner = e
      },

      handelbanner(e) {

        if (this.postForm.img_banner == null) {
          this.postForm.img_banner = []
        }

        this.postForm.img_banner.push({ url: e })

      },
      handelRemove(e) {
        this.postForm.img_list = e
      },
      handelImglist(e) {
        this.postForm.img_list.push({ url: e })
      },
      handelFile(e) {
        this.postForm.videosrc = e
        this.postForm = Object.assign({}, this.postForm)
      },

      HandelImages(e) {
        this.postForm.images_url = e
        this.postForm = Object.assign({}, this.postForm)
      },
      HandelHont(e) {
        var that = this
        this.postForm.hot_img = e
        this.postForm = Object.assign({}, this.postForm)
      },
      Handelhome(e) {
        var that = this
        this.postForm.home_img = e
        this.postForm = Object.assign({}, this.postForm)
      },

      fetchData(id) {
        GetIdByDetails(id).then(response => {
          this.postForm = response.data
          this.product=response.product
          if (this.postForm.img_list === null) {
            this.postForm.img_list = []
          } else {
            var img = this.postForm.img_list.split(',')
            this.postForm.img_list = []
            for (let i = 0; i < img.length; i++) {
              this.postForm.img_list.push({ url: img[i] })
            }

            var banner = this.postForm.img_banner.split(',')
            this.postForm.img_banner = []
            for (let i = 0; i < banner.length; i++) {
              this.postForm.img_banner.push({ url: banner[i] })
            }

          }

          this.setTagsViewTitle()

          // set page title
          this.setPageTitle()
        }).catch(err => {
          console.log(err)
        })
      },
      setTagsViewTitle() {
        const title = 'Edit Article'
        const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
        // this.$store.dispatch('tagsView/updateVisitedView', route)
      },
      setPageTitle() {
        const title = '编辑商品'
        document.title = `${title} - ${this.postForm.id}`
      },
      submitForm() {
        this.$refs.postForm.validate(valid => {

          if (valid) {

            var temp = this.postForm

            var img = this.postForm.img_list
            var newimg = []
            for (let i = 0; i < img.length; i++) {
              newimg.push(img[i].url)
            }

            var banner = this.postForm.img_banner
            console.log(banner)
            if (banner != null) {
              var newbanner = []
              for (let i = 0; i < banner.length; i++) {
                newbanner.push(banner[i].url)
              }

              this.postForm.img_banner = newbanner.join(',')

            }
            this.postForm.img_list = newimg.join(',')
            PostDataBySave(temp).then(res => {
              this.$notify({
                title: '成功',
                message: res.msg,
                type: 'success',
                duration: 2000
              })
            })

            this.loading = false
          } else {
            return false
          }
        })
      },
      draftForm() {
        if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
          this.$message({
            message: '请填写必要的标题和内容',
            type: 'warning'
          })
          return
        }
        this.$message({
          message: '保存成功',
          type: 'success',
          showClose: true,
          duration: 1000
        })
      },
      getRemoteUserList(query) {
        searchUser(query).then(response => {
          if (!response.data.items) return
          this.userListOptions = response.data.items.map(v => v.name)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";

  .main-bg > > > .el-card__body {
    padding: 20px;
    padding-bottom: 5px;
    padding-top: 10px;
  }

  .main-bg > > > .el-form-item__label {
    font-size: 12px;
    font-weight: 400;

  }

  .main-bg > > > .el-form-item {
    margin-bottom: 10px;
  }

  .main-bg {
    background: #f2f2f6;
    padding: 30px;
    border-radius: 10px;
    padding-top: 10px;
    margin-bottom: 30px;

  }

  .box-card {
    margin-bottom: 5px;
  }

  .le {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;

    .le-item {
      width: 16.6%;

      .le-name {
        width: 50%;
      }
    }
  }

  .createPost-container {
    position: relative;

    .createPost-main-container {
      padding: 40px 45px 20px 50px;

      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;

        .postInfo-container-item {
          float: left;
        }
      }
    }

    .word-counter {
      width: 40px;
      position: absolute;
      right: 10px;
      top: 0px;
    }
  }

  .article-textarea /deep/ {
    textarea {
      padding-right: 40px;
      resize: none;
      border: none;
      border-radius: 0px;
      border-bottom: 1px solid #bfcbd9;
    }
  }

  .tdivider {
    margin-bottom: 10px;
    border-bottom: 1px solid;
  }

  .lease {
    width: 30px;
    padding: 0;
  }

  .createPost-container > > > .el-image img {
    width: 100px;
    height: 100px;
  }
</style>
