const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  },
  productionSourceMap: false,
  css: { extract: false },
  chainWebpack(config) {
    // console.log(Object.keys(config.plugins))
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('examples/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('examples/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();
  }
};
