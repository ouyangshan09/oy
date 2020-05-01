const routeMenus = require('./data/menus')

const interfaces = [
  {
    url: '/role/menus',
    type: 'get',
    response: res => {
      return {
        code: 0,
        data: {
          menus: routeMenus
        },
        message: 'success',
      }
    }
  },
  {
    url: '/role/list',
    type: 'get',
    response: res => {
      return {
        code: 0,
        data: null,
        message: 'success'
      }
    }
  },
  {
    url: '/role/create',
    type: 'post',
    response: res => {
      return {
        code: 0,
        data: null,
        message: 'success'
      }
    }
  },
  {
    url: '/role/update',
    type: 'put',
    response: res => {
      return {
        code: 0,
        data: null,
        message: 'success'
      }
    }
  },
  {
    url: '/role/updateStatus',
    type: 'put',
    response: res => {
      return {
        code: 0,
        data: null,
        message: 'success'
      }
    }
  },
  {
    url: '/role/delete',
    type: 'put',
    response: res => {
      return {
        code: 0,
        data: null,
        message: 'success'
      }
    }
  }
]

module.exports = interfaces
