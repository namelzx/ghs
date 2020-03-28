<template>
  <div class="demo-block">
    <el-upload
      :action="apiUrl"
      class="avatar-uploader"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"

      :on-remove="handleRemove"
    >

     <video v-if="imageUrl" :src="imageUrl"></video>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

  </div>
</template>

<script>
  // import oss from '../../utils/aliOss'
  import myconfig from '@/config'

  export default {
    name: 'ListImages',
    props: {
      list: Array,
      index: Number,
      imageUrl: String
    },
    data() {
      return {

        apiUrl: myconfig.uploadUrl.video,

        // fileList: [],
        dialogImageUrl: '',
        dialogVisible: false
      }
    },

    methods: {




      handleAvatarSuccess(file, fileList) {

        this.$emit('handelFile', file.data.url)

      },
      handleRemove(file, fileList) {

        var temp = {
          file: fileList,
          index: this.index
        }
        this.$emit('handleRemove', temp)
      },
      handlePreview(file) {
        console.log(file)
      },
      beforeRemove(file, fileList) {
        console.log(file)
        return this.$confirm(`确定移除 ${file.name}？`)
      }
    }
  }
</script>

<style lang="scss" >
  @import "~@/styles/mixin.scss";
  video{
    width: 100px;
  }

  .avatar-uploader .el-upload {
    background: #ffffff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 100px;
    text-align: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
