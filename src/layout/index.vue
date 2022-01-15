<template>
  <el-container>
    <el-aside width="200px">
      <side-bar />
    </el-aside>
    <el-container>
      <el-header style="background-color: #f5f5f5">
        Header
      </el-header>
      <app-main />
    </el-container>
  </el-container>
</template>

<script>
import SideBar from './SideBar';
import AppMain from './AppMain';

export default {
  name: 'Layout',
  components: {
    AppMain,
    SideBar
  }
}
</script>

<style lang="scss" scoped>
  .app-wrapper {
    position: relative;
    height: 100vh;
    width: 100vw;
  }
</style>