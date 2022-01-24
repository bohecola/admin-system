const TokenKey = 'access_token';

const UserKey = 'current_user';

const PermissionKey = 'permission';

const ViewRoutesKey = 'viewRoutes';

const MenuGroupKey = 'menuGroup';

// 用户token
export function getToken() {
  return localStorage.getItem(TokenKey);
}

export function setToken(val) {
  return localStorage.setItem(TokenKey, val);
}

export function removeToken() {
  return localStorage.removeItem(TokenKey);
}

// 用户信息
export function getUser() {
  return JSON.parse(localStorage.getItem(UserKey));
}

export function setUser(val) {
  return localStorage.setItem(UserKey, JSON.stringify(val));
}

export function removeUser() {
  return localStorage.removeItem(UserKey);
}

// 权限列表
export function setPermission(val) {
  return localStorage.setItem(PermissionKey, JSON.stringify(val));
}

export function getPermission() {
  return JSON.parse(localStorage.getItem(PermissionKey));
}

export function removePermission() {
  return localStorage.removeItem(PermissionKey);
}

// 路由视图
export function setViewRoutes(val) {
  return localStorage.setItem(ViewRoutesKey, JSON.stringify(val));
}

export function getViewRoutes() {
  return JSON.parse(localStorage.getItem(ViewRoutesKey));
}

export function removeViewRoutes() {
  return localStorage.removeItem(ViewRoutesKey);
}

// 树形菜单
export function setMenuGroup(val) {
  return localStorage.setItem(MenuGroupKey, JSON.stringify(val));
}

export function getMenuGroup() {
  return JSON.parse(localStorage.getItem(MenuGroupKey));
}

export function removeMenuGroup() {
  return localStorage.removeItem(MenuGroupKey);
}

