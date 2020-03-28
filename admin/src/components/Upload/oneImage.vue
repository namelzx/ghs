<template>
  <div class="demo-block">
    <el-upload
      :action="apiUrl"
      class="avatar-uploader"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"

      :on-remove="handleRemove"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
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

        apiUrl: myconfig.uploadUrl.img,

        // fileList: [],
        dialogImageUrl: '',
        dialogVisible: false
      }
    },

    methods: {




      handleAvatarSuccess(file, fileList) {
        var temp = {
          file: fileList,
          url:file
        }
        console.log(temp)
        this.$emit('HandelFile', temp)

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

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
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
    width: 70px;
    height: 70px;
    line-height: 70px;
    text-align: center;
  }

  .avatar {
    width: 70px;
    height: 70px;
    display: block;
  }
</style>
