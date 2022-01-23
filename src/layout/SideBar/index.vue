<template>
  <div class="app-slider">
    <div class="app-slider__logo" @click="toHome">
      <img :src="Logo" />
      <span v-if="!menuCollapse">ADMIN-SYS</span>
    </div>

    <div class="app-slider__menu">
      <el-menu
        :default-active="activeMenu"
        :collapse="menuCollapse"
        :collapse-transition="false"
        background-color="#2f3447"
        active-text-color="#2c7fe7"
        text-color="#fff"
        mode="vertical"
        router
      >
        <el-menu-item index="/home">
          <i class="el-icon-monitor"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="/sys" popper-append-to-body>
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>系统管理</span>
          </template>
          <el-menu-item index="/sys/user">用户列表</el-menu-item>
          <el-menu-item index="/sys/role">角色列表</el-menu-item>
          <el-menu-item index="/sys/menu">菜单列表</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  computed: {
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    menuCollapse() {
      return this.$store.getters.menuCollapse;
    },
    Logo() {
      return require('@/assets/logo.png');
    }
  },
  methods: {
    toHome() {
      // location.href = '';
    }
  }
}
</script>

<style lang="scss" scoped>
.app-slider {
  height: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  background-color: #2f3447;

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    cursor: pointer;

    img {
      height: 30px;
      width: 30px;
    }

    span {
      color: #fff;
      font-weight: bold;
      font-size: 26px;
      margin-left: 10px;
      font-family: inherit;
      white-space: nowrap;
    }
  }

  &__menu {
    height: calc(100% - 80px);
    .el-menu {
      width: 100%;
      height: 100%;

      .el-submenu {
        &.is-active {
          ::v-deep .el-submenu__title {
            // #192431
            background-color: rgba(0, 0, 0, 0.2)!important;
          }
        }
      } 

      &-item {
        &.is-active {
          background-color: rgba(0, 0, 0, 0.2) !important;
        }
      }
    }
  }
}
</style>