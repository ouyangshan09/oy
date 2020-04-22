import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(value) {
  return Cookies.set(TokenKey, value)
}

export function removeToken(value) {
  return Cookies.remove(value || TokenKey)
}
