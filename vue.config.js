'use strict'
const path = require('path')

function resolve(value) {
  return path.resolve(__dirname, value)
}

const prot = process.env.APP_PORT

module.exports = {
  devServer: {
    port: prot || 8080,
    overlay: {
      warnings: false,
      errors: true
    },
    before: require('./mock/mock-serve'),
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')

    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
