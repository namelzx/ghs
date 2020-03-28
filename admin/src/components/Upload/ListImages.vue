<template>
  <div class="upload-container">
    <el-upload
      :action="action"
      list-type="picture-card"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :file-list="list">
      <i class="el-icon-plus"></i>
    </el-upload>

  </div>
</template>

<script>
  import { getArrByKey } from '@/utils'
  import myconfig from '@/config'

  export default {
    name: 'ImageUpload',
    props: {
      list: {
        type: Array

      },
    },
    data() {
      return {
        action: myconfig.uploadUrl.img,
        imglist:this.list
      }
    },
    computed: {



    },
    created() {
      console.log(myconfig)
    },
    watch:{
      imglist(e){
        console.log(e)
      },
    },
    methods: {
      handleSuccess(file, fileList) {


        this.$emit('handelFile', file.data.url)
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
        var arr=[];
        for(let i=0;i<fileList.length;i++){

          arr.push({url:fileList[i].url,shop_id:fileList[i].shop_id})
        }
        this.$emit('handelRemove', arr)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      }

    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .upload-container > > > .el-upload--picture-card {
    width: 100px;
    height: 100px;
    line-height: 100px;
  }

  .upload-container > > > .el-upload-list--picture-card .el-upload-list__item {
    width: 100px;
    height: 100px;
  }

  .upload-container {
    /*width: 70px;*/
    height: 100px;
  }

  .image-uploader {
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      width: 100px;
      height: 100px;
      .el-upload-dragger {
        height: 100%;
      }
      &:hover {
        border-color: #409EFF;
      }
    }
    .el-upload-list__item {
      width: 100px;
      height: 100px;
    }
    .image {
      width: 100px;
      height: 100px;
      display: block;
    }

    .image-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
    }

  }
</style>
