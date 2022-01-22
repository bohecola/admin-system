import { login } from '@/api/user';
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
  },
  SET_USERINFO: (state, val) => {
    state.info = val;
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
  },

  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // api => logout
      commit('SET_TOKEN', '');
      commit('SET_USERINFO', {});
      removeToken();
      removeUser();
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