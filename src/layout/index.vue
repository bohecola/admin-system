<template>
  <div class="page-layout" :class="{ collapse: menuCollapse }">
    <div class="page-layout__mask" @click="collapseMenu(true)"></div>

    <div class="page-layout__left">
      <sidebar />
    </div>

    <div class="page-layout__right">
      <div class="page-layout__topbar">
        <topbar />
      </div>

      <div v-if="false" class="page-layout__process">
        <!-- 进程栏 -->
      </div>

      <div class="page-layout__container">
        <div class="page-layout__view" v-if="true">
          <router-view>
            <!-- <keep-alive :include="caches"></keep-alive> -->
            <!-- <component :is="Component"></component> -->
          </router-view>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Sidebar from './sidebar';
import Topbar from './topbar';

export default {
  name: 'Layout',
  components: {
    Sidebar,
    Topbar
  },
  computed: {
    menuCollapse() {
      return this.$store.getters.menuCollapse;
    }
  },
  methods: {
    collapseMenu(val) {
      this.$store.commit('COLLAPSE_MENU', val);
    }
  }
}
</script>

<style lang="scss" scoped>
  $leftWidth: 255px;

  .page-layout {
    display: flex;
    background-color: #f7f7f7;
    height: 100%;
    width: 100%;
    overflow: hidden;

    &__left {
      overflow: hidden;
      height: 100%;
      width: $leftWidth;
      transition: left 0.2s;
      background-color: green;
    }

    &__right {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: calc(100% - $leftWidth);
    }

    &__topbar {
      margin-bottom: 10px;
    }

    &__process {
      margin-bottom: 10px;
      padding: 0 10px;
    }

    &__container {
      width: 100%;
      box-sizing: border-box;
      flex: 1;
      overflow: hidden;
      margin-bottom: 10px;
    }

    &__mask {
      position: fixed;
      left: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.5);
      height: 100%;
      width: 100%;
      z-index: 999;
    }

    &__view {
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      padding: 0 10px;
      border-radius: 3px;

      & > div {
        min-height: 100%;
        overflow: auto;
      }
    }

    @media only screen and (max-width: 768px) {
      .page-layout__left {
        position: absolute;
        left: 0;
        z-index: 9999;
        transition: transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1),
          box-shadow 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
      }

      .page-layout__right {
        width: 100%;
      }

      &.collapse {
        .page-layout__left {
          transform: translateX(-100%);
        }

        .page-layout__mask {
          display: none;
        }
      }
    }

    @media only screen and (min-width: 768px) {
      .page-layout__left,
      .page-layout__right {
        transition: width 0.3s ease-in-out;
      }

      .page-layout__mask {
        display: none;
      }

      &.collapse {
        .page-layout__left {
          width: 64px;
        }

        .page-layout__right {
          width: calc(100% - 64px);
        }
      }
    }
  }
</style>