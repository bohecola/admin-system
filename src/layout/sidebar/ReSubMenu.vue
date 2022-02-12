<template>
  <div class="re-sub-menu">
    <el-menu-item
      v-if="!data.children && !data.hidden"
      :index="data.path"
    >
      <i v-if="data.icon" :class="data.icon"></i>
      <span slot="title">{{ data.name }}</span>
    </el-menu-item>

    <el-submenu v-else :index="data.name" popper-append-to-body>
      <template slot="title">
        <i v-if="data.icon" :class="data.icon"></i>
        <span>{{ data.name }}</span>
      </template>
      <re-sub-menu
        v-for="c in data.children"
        :key="c.name"
        :data="c"
      ></re-sub-menu>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'ReSubMenu',
  props: {
    data: Object
  }
};
</script>

<style lang="scss">
  .el-menu--collapse > div > .el-submenu > .el-submenu__title span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }

  .el-menu--collapse > div > .el-submenu > .el-submenu__title .el-submenu__icon-arrow {
    display: none !important;
  }
</style>
