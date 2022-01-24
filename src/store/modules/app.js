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

const actions = {};

export default {
  state,
  mutations,
  actions
}