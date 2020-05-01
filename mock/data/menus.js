
module.exports = [{
    path: '/redirect',
    hidden: true,
    children: [{
      path: '/redirect/:path(.*)',
    }]
  },
  {
    path: '/',
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      meta: {
        title: '首页',
        icon: 'dashboard',
        affix: true,
      }
    }, ],
  },
  {
    path: '/menus',
    redirect: 'noRedirect',
    meta: {
      title: '菜单',
      icon: 'lock',
    },
    children: [{
        path: 'menu1',
        name: 'menu1',
        meta: {
          title: 'menu1'
        }
      },
      {
        path: 'menu2',
        name: 'menu2',
        meta: {
          title: 'menu2'
        }
      }
    ],
  },
  {
    path: '/icons',
    children: [{
      path: 'index',
      name: 'Icons',
      meta: {
        title: '图标',
        icon: 'icon',
        affix: true,
      }
    }],
  },
  {
    path: '/profile',
    redirect: '/profile/index',
    hidden: true,
    children: [{
      path: 'index',
      name: 'Profile',
      meta: {
        title: '个人信息',
        icon: 'user'
      }
    }]
  },
  {
    path: '/404',
    hidden: true,
  },
  {
    path: '/login',
    hidden: true,
  },
  {
    path: '*',
    hidden: true,
  },
  {
    path: '/permission',
    redirect: 'noRedirect',
    name: 'Permission',
    meta: {
      title: '权限',
      icon: 'lock',
      roles: ['admin'],
    },
    children: [{
      path: 'menu',
      name: 'MenuPermission',
      meta: {
        title: '菜单权限',
        roles: ['admin'],
      }
    }],
  },
  {
    path: '/table',
    name: 'Table',
    redirect: '/table/normal-table',
    meta: {
      title: '表格',
      icon: 'table',
    },
    children: [{
        path: 'normal-table',
        name: 'NormalTable',
        meta: {
          title: '普通表格',
        },
      },
      {
        path: 'drag-table',
        name: 'DragTable',
        meta: {
          title: '拖动表格',
        },
      },
      {
        path: 'inline-edit-table',
        name: 'InlineEditTable',
        meta: {
          title: '内联行编辑表格',
        },
      },
      {
        path: 'condition-table',
        name: 'ConditionTable',
        meta: {
          title: '多条件查询表格',
        },
      }
    ]
  }
]
