var webpack = require('webpack'),
    path = require('path'),
    envVar = require('../server/env'),
    webpackMerge = require('webpack-merge'),
    commonConfig = require('./webpack.common')

module.exports = webpackMerge(commonConfig, {
  cache: true,
  devtool: 'cheap-module-eval-source-map',
  entry: {
    'hmr': 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, '..', 'app'),
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          'presets': ['react', 'es2015', 'stage-0', 'react-hmre']
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('develop'),
        'SPOTIFY_BASE_URI': JSON.stringify(envVar['SPOTIFY_API']),
        'BASE_URI': JSON.stringify(envVar['BASE_URI'])
      }
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ]
})
