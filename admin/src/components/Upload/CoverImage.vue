<template>

  <el-upload
    :http-request="fnUploadRequest"

    class="avatar-uploader"
    :action="apiUrl"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>

  import oss from '../../utils/aliOss'

  import myconfig from '@/config'

  export default {
    props:{
      imageUrl:String,
    },
    data() {
      return {
        apiUrl:  myconfig.uploadUrl.img,
      };
    },
    methods: {

      async fnUploadRequest (option) {

        let op=  oss.ossUploadFile(option)
        op.then(res=>{
          let url=myconfig.VUE_APP_BASE_IMG_OSS+ res.url
          this.$emit('showParentComp', url)
          // var temp = {
          //   file: res,
          //   index: this.index
          // }
          // this.$emit('videoParentSucess', temp)
        })

      },
      handleAvatarSuccess(res, file) {
        // this.$emit('showParentComp', res.data.url)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;


        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return  isLt2M;
      }
    }
  }
</script>



<style lang="scss" >
  @import "~@/styles/mixin.scss";
  .avatar-uploader .el-upload {
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
    line-height: 108px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
