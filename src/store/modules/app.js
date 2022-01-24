const { clientWidth } = document.documentElement;

const isMini = clientWidth < 768;

const state = {
  collapse: isMini ? true : false
};

const mutations = {
  COLLAPSE_MENU: (state, val) => {
    state.collapse = val;
  }
};

const actions = {
  async appLoad({ getters, dispatch, commit }) {
    if (getters.token) {
      await dispatch('permMenu');

      dispatch('user/userInfo');
    }
  }
};

export default {
  state,
  mutations,
  actions
}