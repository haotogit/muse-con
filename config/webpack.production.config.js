var path = require('path'),
    webpack = require('webpack'),
    envVars = require('../server/env'),
    webpackMerge = require('webpack-merge'),
    commonConfig = require('./webpack.common'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
  entry: {
    'app': path.join(__dirname, '..', 'app/index.jsx'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, '..', 'app'),
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          'presets': ['es2015', 'stage-0', 'react'],
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
      'process.env':{
        'NODE_ENV': JSON.stringify('prod')
      }
    }]),
    new webpack.optimize.UglifyJsPlugin()
  ]
})
