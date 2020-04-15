import request from '../utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data: data,
  })
}

export function getInfo(data) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token: data }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post',
  })
}

