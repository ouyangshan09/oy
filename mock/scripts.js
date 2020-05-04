/**
 * 模拟脚本列表数据
*/
const mockjs = require('mockjs')

const count = 100
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

const tableData = new Array(count).fill({}).map(() => {
  return mockjs.mock({
    id: '@increment',
    timestamp: +mockjs.Random.date('T'),
    author: '@first',
    title: '@title(5, 10)',
    content_short: 'mock data',
    image_uri,
  })
})

const tableData2 = new Array(10).fill({}).map(() => {
  return mockjs.mock({
    id: '@increment',
    title: '@title(5, 10)',
    author: '@first',
    updateAt: +mockjs.Random.date('T'),
    stauts: mockjs.Random.integer(1, 2),
  })
})

const tableData3 = new Array(100).fill({}).map(() => {
  return mockjs.mock({
    id: '@increment',
    username: '@first',
    comment: '@title(1, 6)',
    status: mockjs.Random.integer(1, 2),
    createAt: +mockjs.Random.date('T'),
  })
})

const interfaces = [
  {
    url: '/shareScript/queryList',
    type: 'get',
    response: request => {
      const { page = 1, limit = 15, sort } = request.query

      let mockList = tableData.filter(item => !!item)

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 0,
        data: {
          page: parseInt(page),
          pageSize: parseInt(limit),
          total: tableData.length,
          rows: pageList,
        },
        message: 'success'
      }
    }
  },
  {
    url: '/inline-table/queryList',
    type: 'get',
    response: request => {
      return {
        code: 0,
        data: {
          rows: tableData2,
        },
        message: 'success'
      }
    }
  },
  {
    url: '/inline-table/updateItem',
    type: 'put',
    response: () => {
      return {
        code: 0,
        data: {},
        message: 'success'
      }
    }
  },
  {
    url: '/condition-table/queryList',
    type: 'get',
    response: request => {
      const { page = 1, limit = 15, username, status, sort } = request.query

      const mockList = tableData3.filter(item => {
        if (username && item.username !== username) {
          return false
        }
        if (status && item.status != status) {
          return false
        }
        return true
      })

      let resultList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      if (sort === '-sort') {
        resultList = resultList.reverse()
      }

      return {
        code: 0,
        data: {
          page: parseInt(page),
          pageSize: parseInt(limit),
          total: tableData3.length,
          rows: resultList
        },
        message: 'success'
      }
    }
  }
]

module.exports = interfaces
