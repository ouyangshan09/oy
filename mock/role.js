const routeMenus = require('./data/menus')

const roles = [
  {
    id:  1,
    name: 'admin',
    describe: '超级管理员',
    status: 1,
    menus: routeMenus,
  },
  {
    id:  2,
    name: 'editor',
    describe: '业务管路员',
    status: 1,
    menus: routeMenus.filter(item => item !== '/permission/menu'),
  },
  {
    id:  3,
    name: 'guest',
    describe: '访客',
    status: 1,
    menus: routeMenus.filter(item => item === '/home'),
  },
]

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
        data: roles,
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
