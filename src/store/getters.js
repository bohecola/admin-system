const getters = {
  menuCollapse: state => state.app.collapse,
  token: state => state.user.token,
  userInfo: state => state.user.info
};

export default getters