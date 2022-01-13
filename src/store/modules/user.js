import { login } from '@/api/user';
import { getToken, setToken, setUser, getUser } from '@/utils/auth';

const state = {
  token: getToken(),
  name: null,
  avatar: null,
  desc: null,
  roles: null,
  user: getUser()
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_USER: (state, user) => {
    state.user = user;
  }
};

const actions = {
  login({ commit }, loginForm) {
    const { username, password } = loginForm;
    return new Promise((resolve, reject) => {
      login({ username, password })
      .then(res => {
        commit('SET_TOKEN', res.token);
        commit('SET_NAME', res.username);
        commit('SET_AVATAR', res.avatar);
        commit('SET_ROLES', res.roles);
        commit('SET_USER', res);
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