<template>
  <div class="form-input">
    <div class="form-list">
      <span>{{title}}:</span>
      <slot></slot>
      <!--<el-input v-model="input" placeholder="请输入内容"></el-input>-->
    </div>

  </div>
</template>

<script>
  export default {
    name: "index",
    props: {
      title: String,
    }

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /*.form-list > > > .el-input__inner {*/
    /*height: 27px;*/
    /*line-height: 27px;*/
  /*}*/

  .form-input {
    display: flex;
    flex-direction: row;
    margin-right: 16px;
    /*width: 15%;*/
    margin-bottom: 10px;

    .form-list {
      display: flex;
      flex-direction: row;
      align-items: center;
      span {
        font-size: 10px;
        min-width: 40px;

      }
    }
  }

</style>
