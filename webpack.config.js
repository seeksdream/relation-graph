const webpack = require('webpack')
const path = require('path')
const { merge } = require('webpack-merge')
const { VueLoaderPlugin } = require('vue-loader')
module.exports = merge({
  // devtool: 'source-map',
  mode: 'production',
  entry: {
    'relation-graph': ['./src/index.js']
    // 'relation-graph': ['babel-polyfill', './src/index.js']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'relation-graph.min.js',
    publicPath: '/dist/',
    library: 'relation-graph',
    libraryExport: 'default',
    libraryTarget: 'umd',
    umdNamedDefine: true
    // globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    },
    vuex: {
      root: 'Vuex',
      commonjs: 'vuex',
      commonjs2: 'vuex',
      amd: 'vuex'
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
  },
  resolve: {
    extensions: ['.js', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // this will apply to both plain .js files
      // AND <script> blocks in vue files
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      // this will apply to both plain .css files
      // AND <style> blocks in vue files
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      // this will apply to both plain .scss files
      // AND <style lang="scss"> blocks in vue files
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              data: '$color: red;'
            }
          }
        ]
      }, {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        use: 'url-loader?limit=8192'
      }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}, {
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ]
})
