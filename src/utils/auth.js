const TokenKey = 'access_token';

const UserKey = 'current_user';

export function getToken() {
  return localStorage.getItem(TokenKey);
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token);
}

export function removeToken() {
  return localStorage.removeItem(TokenKey);
}

export function getUser() {
  return localStorage.getItem(UserKey);
}

export function setUser(data) {
  return localStorage.setItem(UserKey, JSON.stringify(data));
}

export function removeUser() {
  return localStorage.removeItem(UserKey);
}