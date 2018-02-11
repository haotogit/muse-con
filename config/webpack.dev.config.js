var webpack = require('webpack'),
    path = require('path'),
    envVar = require('../server/env'),
    webpackMerge = require('webpack-merge'),
    commonConfig = require('./webpack.common'),
    dotenv = require('dotenv')

dotenv.config()

module.exports = webpackMerge(commonConfig, {
  cache: true,
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, '..', 'dist')
      }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  devServer: {
    inline: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, '..', 'dist'),
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('dev'),
        'TICKETMASTER_URL': JSON.stringify(process.env.TICKETMASTER_URL),
        'TICKETMASTER_KEY': JSON.stringify(process.env.TICKETMASTER_KEY)
      }
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ]
})
