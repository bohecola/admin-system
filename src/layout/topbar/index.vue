<template>
  <div class="app-topbar">
    <div class="app-topbar__collapse" @click="collapse">
      <i :class="[menuCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"></i>
    </div>

    <!-- 一级菜单 -->
    <div v-if="false" class="app-topbar__menu"></div>

    <!-- 路由导航 -->
    <div class="app-topbar__route-nav">

    </div>

    <div class="flex1"></div>

    <!-- 工具栏 -->
    <ul class="app-topbar__tools">
      <!-- 消息通知 v-if="modules.chat" -->
      <li v-if="false">
        <!-- <cl-chat-notice /> -->
      </li>

      <!-- 主题 v-if="modules.theme" -->
      <li v-if="false">
        <!-- <cl-theme /> -->
      </li>
    </ul>

    <!-- 用户信息 -->
    <div class="app-topbar__user">
      <el-dropdown trigger="click" :hide-on-click="false" @command="onCommand">
        <span class="el-dropdown-link">
          <span class="name">{{ userInfo.username }}</span>
          <img class="avatar" :src="userInfo.avatar" />
        </span>

        <template #dropdown>
          <el-dropdown-menu class="dropdown-menu__user">
            <el-dropdown-item command="my">个人中心</el-dropdown-item>
            <el-dropdown-item command="exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'topbar',
  data() {
    return {

    }
  },
  computed: {
    // 菜单是否展开
    menuCollapse() {
      return this.$store.getters.menuCollapse;
    },
    // 用户信息
    userInfo() {
      return this.$store.getters.userInfo;
    }
  },
  methods: {
    collapse() {
      this.$store.commit('COLLAPSE_MENU', !this.menuCollapse);
    },
    async onCommand(name) {
      switch(name) {
        case 'my':
          this.$router.push('/my/info');
          break;
        case 'exit':
          await this.$store.dispatch('user/logout')
          this.$router.push('/login');
          break;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown-menu__user {
	width: 120px;
}

.app-topbar {
  display: flex;
  align-items: center;
  height: 50px;
  background: #fff;

  &__collapse {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 40px;
    cursor: pointer;
    margin-right: 10px;

    i {
      font-size: 22px;
      color: #666;
    }
  }

  .flex1 {
    flex: 1
  }

  &__tools {
    display: flex;
    margin-right: 20px;

    & > li {
      display: flex;
      justify-content: center;
      align-items: center;
      list-style: none;
      height: 45px;
      padding: 0 10px;
      cursor: pointer;

      i {
        font-size: 18px;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }

  &__user {
    margin-right: 10px;
    cursor: pointer;

    .el-dropdown-link {
      display: flex;
      align-items: center;
    }

    .avatar {
      height: 32px;
      width: 32px;
      border-radius: 32px;
      object-fit: cover;
    }

    .name {
      white-space: nowrap;
      margin-right: 15px;
    }
  }
}
</style>