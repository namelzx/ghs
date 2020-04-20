<template>

  <div class="container">
    <div class="list-warp">
      <div class="name">浏览量</div>
      <div class="num">0</div>
      <div class="ratio">
        <span></span>
        <span>/%</span>
        <img src="@/assets/go-icon.png"/>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'data'
  }
</script>

<style lang="scss" scoped>
  .container {
    padding: 20px;
    font-size: 16px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    .tatle {
      padding: 20px;
      border: 1px solid #dcdfe6;
      border-radius: 10px;
      margin-bottom: 30px;
      .tatle-title {
        border-bottom: 1px solid #e4e4e6;
        padding-bottom: 20px;
        font-size: 18px;
        color: #606266;
        i {
          margin-left: 5px;
        }
      }
      .tatle-list {
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .list-warp {
          width: 20%;
          text-align: center;
          margin-top: 30px;
          margin-bottom: 20px;
          .name {
            color: #606266;
            font-size: 14px;
          }
          .num {
            height: 60px;
            line-height: 60px;
            font-size: 30px;
          }
          .ratio {
            color: #fb5356;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            img {
              margin-left: 5px;
              width: 22px;
              height: 22px;
            }
          }
          .ratio-ac {
            color: #5cd750;
          }
        }
      }
    }
  }
</style>
