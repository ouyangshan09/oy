/**
 * 模拟器服务器
*/
const path = require('path')
const chokidar = require('chokidar')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const mockjs = require('mockjs')

const mockDir = path.join(process.cwd(), 'mock')

console.log('mock:', mockDir)

function registerRoutes (app) {
  let mockLastIndex
  const { default: mocks } = require('./index')
  const mocksForServer = mocks.map(route => {
    return responseFake(route.url, route.type, route.response)
  })
  for (const mock of mocksForServer) {
    app[mock.type](mock.url, mock.response)
    mockLastIndex = app._router.stack.length
  }
  const mockRoutesLength = Object.keys(mocksForServer).length

  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength,
  }
}

function unregisterRoutes () {
  Object.keys(require.cache).forEach(i => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)]
    }
  })
}

const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`${process.env.VUE_APP_NETWORK_URL}${url}`),
    type: type || 'GET',
    response: (request, response) => {
      console.log('request invoke:', request.path)
      response.json(mockjs.mock(respond instanceof Function ? respond(request, response) : respond))
    }
  }
}


module.exports = app => {
  require('@babel/register')({
    ignore: [],
  })

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true,
  }))

  const mockRoutes = registerRoutes(app)
  let mockRoutesLength = mockRoutes.mockRoutesLength
  let mockStartIndex = mockRoutes.mockStartIndex

  chokidar.watch(mockDir, {
    ignored: /mock-server/,
    ignoreInitial: true,
  }).on('all', (event, path) => {
    if (event === 'change' || event === 'add') {
      try {
        app._router.stack.splice(mockStartIndex, mockRoutesLength)

        // 移除mock routes
        unregisterRoutes()

        const mockRoutes = registerRoutes(app)
        mockRoutesLength = mockRoutes.mockRoutesLength
        mockStartIndex = mockRoutes.mockStartIndex

        console.log(chalk.magentaBright(`\n > Mock Server hot reload success! changed ${path}`))
      } catch (e) {
        console.log(chalk.redBright(e))
      }
    }
  })
}
