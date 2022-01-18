// const path = require('path')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  // outputDir: './build', // 默认为 dist
  configureWebpack: {
    // 设置别名的方法，三种方法效果是一样的
    // 第一种
    resolve: {
      alias: {
        views: '@/views'
      }
    },
    // 第二种
    // configureWebpack: (config) => {
    //   config.resolve.alias = {
    //     '@': path.resolve(__dirname, 'src'),
    //     views: '@/views'
    //   }
    // },
    // 第三种
    // chainWebpack: (config) => {
    //   config.resolve.alias.set('@', path.resolve(__dirname, 'src')).set('views', '@/views')
    // }
    // 使用插件自动导入elmentplus（按需引入）
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
}
