/**
 * 角色菜单权限业务
*/
import request from '../utils/request'

export function getRouteMenuList() {
  return request({
    url: '/role/menus',
    method: 'get',
  })
}

export function getRoleList() {
  return request({
    url: '/role/list',
    method: 'get',
  })
}

export function createRole(data) {
  return request({
    url: '/role/create',
    method: 'post',
    data,
  })
}

export function updateRole(data) {
  return request({
    url: '/role/update',
    method: 'put',
    data,
  })
}

export  function updateRoleStatus(data) {
  return request({
    url: '/role/updateStatus',
    method: 'put',
    data,
  })
}

export function deleteRole(id) {
  return request({
    url: '/role/delete',
    method: 'delete',
    params: {
      id,
    }
  })
}
