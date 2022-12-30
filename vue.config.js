// const path = require('path');
// function resolve(dir) {
//   return path.join(__dirname, dir);
// }
module.exports = {
  configureWebpack: {
    output: {
      libraryExport: 'default'
    },
    externals: {
      vue: {
        root: 'Vue',
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue'
      },
      html2canvas: {
        root: 'html2canvas',
        commonjs: 'html2canvas',
        commonjs2: 'html2canvas',
        amd: 'html2canvas'
      },
      screenfull: {
        root: 'screenfull',
        commonjs: 'screenfull',
        commonjs2: 'screenfull',
        amd: 'screenfull'
      }
    }
  },
  productionSourceMap: false,
  css: { extract: false }
  // chainWebpack(config) {
  // console.log(Object.keys(config.plugins))
  // set svg-sprite-loader
  // config.module
  //   .rule('svg')
  //   .exclude.add(resolve('examples/icons'))
  //   .end();
  // config.module
  //   .rule('icons')
  //   .test(/\.svg$/)
  //   .include.add(resolve('examples/icons'))
  //   .end()
  //   .use('svg-sprite-loader')
  //   .loader('svg-sprite-loader')
  //   .options({
  //     symbolId: 'icon-[name]'
  //   })
  //   .end();
  // }
};
