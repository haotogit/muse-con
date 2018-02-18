var path = require('path'),
    webpack = require('webpack'),
    envVars = require('../server/env'),
    webpackMerge = require('webpack-merge'),
    commonConfig = require('./webpack.common'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
  devtool: 'sourcemap',
  entry: {
    'app': path.join(__dirname, '..', 'app/index.jsx'),
    'config': path.join(__dirname, '..', 'server/config/config.js')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          'presets': [['es2015', { 'modules': false }], 'stage-2', 'react'],
          'plugins': [
            'transform-decorators-legacy',
            'transform-object-assign',
            'transform-react-remove-prop-types',
            'transform-react-constant-elements',
            'transform-react-inline-elements'
          ]
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('prod'),
        'TICKETMASTER_URL': JSON.stringify('https://app.ticketmaster.com/discovery/v2'),
        'TICKETMASTER_KEY': JSON.stringify('MwOoif9Ac5iZFedZG7xMW368oRbghDAz'),
        'API_PROTOCOL': JSON.stringify('http'),
        'API_HOSTNAME': JSON.stringify('18.218.34.186'),
        'SPOTIFY_CLIENT_ID': JSON.stringify('967d0ee071fc41c99fcd12d6dc5718c0'),
        'SPOTIFY_CLIENT_SECRET': JSON.stringify('caf7a40f87d342ac8735618a93b3a44d'),
        'SPOTIFY_REDIRECT_URI': JSON.stringify('http://18.218.34.186/api/v1/authSpotify/callback'),
      }
    })
  ]
})
