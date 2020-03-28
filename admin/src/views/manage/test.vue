<template>
  <div class="md">

    <el-collapse v-model="activeNames" >
      <el-collapse-item name="1">
        <span class="collapse-title" slot="title">
          <el-checkbox v-model="checked">概况</el-checkbox></span>
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  export default {
    name: 'test',
    data() {
      return {
        activeNames: 1,
        checked:undefined,
      }
    },
    created() {
      var id = this.bill_no = this.$route.params && this.$route.params.id

      console.log(id)
    }
  }
</script>

<style scoped>
  .collapse-title {
    flex: 1 0 90%;
    order: 1;
  }

  .el-collapse-item__header {
    flex: 1 0 auto;
    order: -1;
  }
 .md>>> .el-icon-arrow-right:before{
   content: "\E60E";
  }

</style>
