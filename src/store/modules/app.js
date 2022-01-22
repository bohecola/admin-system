const state = {
  collapse: false
};

const mutations = {
  COLLAPSE_MENU: (state, val) => {
    state.collapse = val;
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}