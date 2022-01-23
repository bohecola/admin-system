import { login, userInfo } from '@/api/common';
import { 
  getToken,
  setToken,
  removeToken,
  setUser,
  getUser,
  removeUser 
} from '@/utils/auth';

const state = {
  token: getToken() || null,
  info: getUser() || {}
};

const mutations = {
  SET_TOKEN: (state, val) => {
    state.token = val;
    setToken(val);
    
  },
  SET_USERINFO: (state, val) => {
    state.info = val;
    setUser(val);
  },
  CLEAR_TOKEN: (state) => {
    state.token = null;
    removeToken();
  },
  CLEAR_USER: (state) => {
    state.info = {};
    removeUser();
  }
};

const actions = {
  // 用户登录
  login({ commit }, loginForm) {
    const { username, password } = loginForm;
    return new Promise((resolve, reject) => {
      login({ username, password })
        .then(res => {
          commit('SET_TOKEN', res.token);
          commit('SET_USERINFO', res);
          resolve();
        })
        .catch(err => {
          reject(err);
        })
    })
  },

  // 用户信息
  userInfo({ commit }) {
    return userInfo().then(res => {
      commit('SET_USERINFO', res)
      return res;
    })
  },

  // 用户退出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // api => logout
      commit('CLEAR_TOKEN');
      commit('CLEAR_USER');
      resolve();
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}