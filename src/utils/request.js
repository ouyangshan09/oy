/**
 * 基于Axios封装业务请求库
 * @author ouyang
*/

import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'

const instance = axios.create({
  baseURL: process.env.VUE_APP_NETWORK_URL,
  timeout: 6000,
  paramsSerializer: params => qs.stringify(params),
  validateStatus: status => status >= 200 && status < 300,
})

instance.interceptors.request.use(
  (config) => {
    // 如果token存在，则使用填充token值
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    const data = response.data
    if (data.code !== 0) {
      Message({
        message: data.message || 'Error',
        type: 'error',
        duration: 5 * 1000,
      })
      // 处理其它情况 登出，过期、重新登录

      return Promise.reject(data.message || 'Error')
    } else {
      return data
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  },
)

export default instance
