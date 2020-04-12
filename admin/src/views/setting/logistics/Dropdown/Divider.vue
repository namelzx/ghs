<template>
  <div class="divider">
    <div class="b">&#32;&nbsp</div>
    <div class="title">{{title}}</div>

  </div>
</template>

<script>
  export default {
    name: "Divider",
    props: {
      title: String,
    }
  }
</script>

<style scoped>
  .divider {
    display: flex;
    flex-direction: row;;
    height: 50px;
    align-items: center;
    border-bottom: 1px solid #eef1f5;
    margin-bottom: 10px;
  }
  .b {
    width: 3px;
    background: #409EFF;

  }
  .title{
    text-indent: 10px;
  }
</style>
