const webpack = require('webpack')
const path = require('path')
const { merge } = require('webpack-merge')
// var VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = merge({
  // devtool: 'source-map',
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
    umdNamedDefine: true,
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
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader'
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
    // new VueLoaderPlugin(),
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
