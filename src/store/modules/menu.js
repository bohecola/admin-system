import { 
  setViewRoutes,
  getViewRoutes,
  removeViewRoutes,
  setMenuGroup,
  getMenuGroup,
  removeMenuGroup,
  setPermission,
  getPermission,
  removePermission,
} from '@/utils/auth';

import { permMenu } from '@/api/common';

const state = {
  // 视图路由, type=1
  routes: getViewRoutes() || [],
  // 树形菜单
  group: getMenuGroup() || [],
  // 左侧菜单
  menu: [],
  // 权限列表
  permission: getPermission() || []
};

const getters = {
  // 树形菜单列表
  menuGroup: state => state.group,
  // 左侧菜单
  menuList: state => state.menu,
  // 视图路由
  routes: state => state.routes,
  // 权限列表
  permission: state => state.permission
};

const mutations = {
  // 设置树形菜单列表
  SET_MENU_GROUP(state, list) {
    state.group = list;
    setMenuGroup(list);
  },
  // 设置视图路由
  SET_VIEW_ROUTES: (state, list) => {
    state.routes = list;
    setViewRoutes(list);
  },
  // 设置左侧菜单
  SET_MENU_LIST: (state) => {
    state.menu = state.group;
  }
};

const actions = {
  // 设置菜单、权限
  permMenu({ commit, state, getters }) {
    return new Promise((resolve, reject) => {
      permMenu()
        .then(res => {
          console.log(res);
          resolve()
        })
        .catch(err => {
          reject(err);
        })
    })
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}