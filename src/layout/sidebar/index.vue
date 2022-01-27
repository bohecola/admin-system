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
        <re-sub-menu
          v-for="e in menuList"
          :key="e._id"
          :data="e"
        ></re-sub-menu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import ReSubMenu from './ReSubMenu';

export default {
  name: 'sidebar',
  components: {
    ReSubMenu
  },
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
    },
    menuList() {
      return this.$store.getters.menuList;
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

      ::v-deep .el-submenu {
        &.is-active {
          ::v-deep .el-submenu__title {
            // #192431
            // background-color: #4165d7!important;
            background-color: rgba(0, 0, 0, 0.2) !important;
            // &:hover {
            //   background-color: #4165d7!important;
            //   color: #fff;
            // }
          }
        }
      } 

      ::v-deep &-item {
        // &:hover {
        //   background-color: #4165d7!important;
        //   color: #fff;
        // }
        &.is-active {
          // rgba(0, 0, 0, 0.2)
          // background-color: #4165d7 !important;
          background-color: rgba(0, 0, 0, 0.2) !important;
        }
      }
    }
  }
}
</style>