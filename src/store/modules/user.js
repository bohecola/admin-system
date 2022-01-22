import { login } from '@/api/user';
import { getToken, setToken, setUser, getUser } from '@/utils/auth';

const state = {
  token: getToken() || null,
  info: getUser() || {}
};

const mutations = {
  SET_TOKEN: (state, val) => {
    state.token = val;
  },
  SET_USERINFO: (state, val) => {
    state.userInfo = val;
  }
};

const actions = {
  login({ commit }, loginForm) {
    const { username, password } = loginForm;
    return new Promise((resolve, reject) => {
      login({ username, password })
        .then(res => {
          commit('SET_TOKEN', res.token);
          commit('SET_USERINFO', res);
          setToken(res.token);
          setUser(res);
          resolve();
        })
        .catch(err => {
          console.log(err);
          reject(err);
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}