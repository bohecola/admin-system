const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  desc: state => state.user.desc,
  roles: state => state.user.roles,
  user: state => state.user.user
};

export default getters