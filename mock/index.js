const user = require('./user')
const scripts = require('./scripts')
const role = require('./role')

const mocks = [
  ...user,
  ...scripts,
  ...role,
]

module.exports = mocks
