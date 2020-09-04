const webpack = require('webpack')
const path = require('path')
const { merge } = require('webpack-merge')

module.exports = merge({
  // devtool: 'source-map',
  entry: {
    'relation-graph': './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'relation-graph.min.js',
    publicPath: '/dist/',
    library: 'relation-graph',
    libraryTarget: 'umd',
    umdNamedDefine: true
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
    }
  },
  resolve: {
    extensions: ['.js', '.vue']
  },
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          css: 'vue-style-loader!css-loader',
          sass: 'vue-style-loader!css-loader!sass-loader'
        },
        postLoaders: {
          html: 'babel-loader'
        }
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        'autoprefixer-loader'
      ]
    }, {
      test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
      loader: 'url-loader?limit=8192'
    }]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    //new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   uglifyOptions: {
    //     ie8: false,
    //     output: {
    //       comments: false,
    //       beautify: false,
    //     },
    //     mangle: {
    //       keep_fnames: true
    //     },
    //     compress: {
    //       warnings: false,
    //       drop_console: true
    //     }
    //   }
    // })
  ]
})
