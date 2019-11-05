<template>
  <div class="nav-bar">
    <!--因为不能再slot上添加class用于添加样式，所以需要给外层包div-->
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
    export default {
        name: "NavBar"
    }
</script>

<style scoped>
  .nav-bar {
    display: flex;
    line-height: 44px; /*行高和高度的区别之一是行高只有内容时才会生效，而高度是实实在在的高度，无论有没有内容行高都会生效（设置背景颜色）*/
    height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,.1);
  }
  .left, .right {
    width: 60px;
  }
  .center {
    flex: 1;
  }
</style>
