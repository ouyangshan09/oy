'use strict'
const path = require('path')

function resolve(value) {
  return path.resolve(__dirname, value)
}

const prot = process.env.VUE_APP_PORT
const host = process.env.VUE_APP_HOST

module.exports = {
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: prot || 8080,
    host: host,
    overlay: {
      warnings: false,
      errors: true
    },
    before: require('./mock/mock-server.js'),
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    }
  },
  chainWebpack: (config) => {
    // config.resolve.alias
    //   .set('vue$', 'vue/dist/vue.esm.js')
    // config.plugins.delete('preload') // H5新特性（空闲加载） 提高体验
    // config.plugins.delete('prefetch') // H5新特性（空闲加载） 提高体验

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
