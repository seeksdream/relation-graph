const path = require('path')
const webpack = require('webpack')
const uglify = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './index.js', // 入口文件，就是在src目录下的index.js文件，
  output: {
    path: path.resolve(__dirname, './dist'), // 输出路径dist目录
    publicPath: '/dist/',
    filename: 'relation-graph.min.js', // 打包后输出的文件名字,这里需要和package.json文件下main应该写为:'dist/toast.min.js'
    libraryTarget: 'umd', // libraryTarget：为了支持多种使用场景，我们需要选择合适的打包格式。libraryTarget 属性。这是可以控制 library 如何以不同方式暴露的选项。
    umdNamedDefine: true
  },
  // 这里我们可以剔除掉一些通用包,自己的包不打包这些类库,需要用户环境来提供
  externals: {
    vue: 'vue',
    vuex: 'vuex'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'scss-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader' // babel的相关配置在.babelrc文件里
      },
      {
        test: /\.(png|jpg|gif|ttf|svg|woff|eot)$/,
        loader: 'url-loader',
        query: {
          limit: 30000 // 把一些小图片打包为base64
        }
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    // 压缩js代码
    new webpack.optimize.UglifyJsPlugin({
      // 输出不显示警告
      compress: {
        warnings: false // 默认值
      },
      // 输出去掉注释
      output: {
        comments: false // 默认值
      }
    })
  ]
}
