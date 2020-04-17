
/**
 * 模拟用户业务请求
*/
const userData = {
  admin: {
    token: 'admin-token',
  },
}

const infoData = {
  'admin-token': {
    name: 'ouyang',
    roles: ['admin'],
    avatar: 'https://www.baidu.com'
  }
}

const interfaces = [
  {
    url: '/oy/user/login',
    type: 'post',
    response: res => {
      const { username } = res.body
      const token = userData[username]

      if (!token) {
        return {
          code: 40001,
          message: '账号不存在',
        }
      }

      return {
        code: 0,
        data: token,
        message: 'success',
      }
    }
  },
  {
    url: '/oy/user/info',
    type: 'get',
    response: res => {
      const { token } = res.query
      const info = infoData[token]

      if (!info) {
        return {
          code: 40002,
          message: '查询失败',
        }
      }

      return {
        code: 0,
        data: info
      }
    },
  },
  {
    url: '/oy/user/logout',
    type: 'put',
    response: res => {
      return {
        code: 0,
        message: 'success',
      }
    }
  }
]

module.exports = interfaces
