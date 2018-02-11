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
    new webpack.DefinePlugin([{
      'envVars':{
        'NODE_ENV': JSON.stringify('prod')
      }
    }]),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    })
  ]
})
