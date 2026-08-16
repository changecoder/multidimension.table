<template>
  <div class="root-app">
    <header></header>
    <div class="content">
      <div class="left"></div>
      <div class="right">
        <div class="view-head-wrapper"></div>
        <div class="main-view-wrapper">
          <div class="toolbar-wrapper"></div>
          <div class="table-view-content">
            <grid-view></grid-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import GridView from "./components/grid-view.vue";
</script>
<style lang="less" scoped>
header {
  display: flex;
  position: relative;
  line-height: 64px;
  height: 64px;
  border-bottom: 1px solid rgb(222, 224, 227);
  padding-left: 16px;
}
.content {
  max-height: 100%;
  height: 100%;
  display: flex;
}
.left {
  position: relative;
  width: 240px;
  height: 100%;
}
.right {
  position: relative;
  height: 100%;
  width: calc(100% - 240px);
  overscroll-behavior-x: none;
  right: 0px;
  left: 240px;
  top: 0px;
}
</style>
