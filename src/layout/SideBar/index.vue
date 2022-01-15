<template>
  <el-menu
    default-active="home"
    text-color="#fff"
    active-text-color="#2c7fe7"
    background-color="#1f2d3d"
    mode="vertical"
    router
  >
    <el-menu-item index="/home">
      <i class="el-icon-monitor"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="1" popper-append-to-body>
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>系统管理</span>
      </template>
      <el-menu-item index="/sys/user">用户列表</el-menu-item>
      <el-menu-item index="/sys/role">角色列表</el-menu-item>
      <el-menu-item index="/sys/menu">菜单列表</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'SideBar',
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .el-menu {
    height: 100vh;

    .el-submenu {
      &.is-active {
        ::v-deep .el-submenu__title {
          background-color: #192431 !important;
        }
      }
    } 

    &-item {
      &.is-active {
        background-color: #192431 !important;
      }
    }
  }
</style>