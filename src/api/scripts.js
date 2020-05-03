/**
 * 列表数据接口
*/
import request from '../utils/request'

export function fetchList(data) {
  return request({
    url: '/shareScript/queryList',
    method: 'get',
    params: data,
  })
}

export function fetchList2() {
  return request({
    url: '/inline-table/queryList',
    method: 'get',
  })
}

