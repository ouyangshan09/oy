/**
 * 模拟用户业务请求
 */
const Mockjs = require('mockjs')

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

const userList = new Array(100).fill({}).map(() => {
  return Mockjs.mock({
    id: '@increment',
    username: '@first',
    comment: '@title(1, 6)',
    createAt: +Mockjs.Random.date('T'),
    status: Mockjs.Random.integer(1, 2),
    roles: [
      'admin',
      'editor',
      'guest',
    ],
  })
})

const interfaces = [{
    url: '/user/login',
    type: 'post',
    response: res => {
      const {
        username
      } = res.body
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
    url: '/user/info',
    type: 'get',
    response: res => {
      // console.log('service query:', res)
      const token = res.headers.token
      const info = infoData[token]

      if (!info) {
        return {
          code: 40002,
          message: '查询失败',
          data: null,
        }
      }

      return {
        code: 0,
        data: info,
        message: 'success',
      }
    },
  },
  {
    url: '/user/logout',
    type: 'put',
    response: res => {
      return {
        code: 0,
        message: 'success',
      }
    }
  },
  {
    url: '/admin-api/userList',
    type: 'get',
    response: request => {
      const {
        page = 1, limit = 20, ...other
      } = request.query

      const filterData = userList.filter(item => {
        if (other.id && item.id != other.id) {
          return false
        }
        if (other.status && item.status != other.status) {
          return false
        }
        if (other.username && item.username.indexOf(other.username) < 0) {
          return false
        }
        if (other.role && !item.roles.includes(other.role)) {
          return false
        }
        return true
      })

      let pageList = filterData.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      if (other.sort === '-sort') {
        pageList = pageList.reverse()
      }

      return {
        code: 0,
        data: {
          page: parseInt(page),
          pageSize: parseInt(limit),
          total: userList.length,
          rows: pageList,
        },
        message: 'success',
      }
    }
  }
]

module.exports = interfaces
