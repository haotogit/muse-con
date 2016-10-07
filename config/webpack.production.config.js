var path = require('path'),
    webpack = require('webpack'),
    envVars = require('../server/env'),
    webpackMerge = require('webpack-merge'),
    commonConfig = require('./webpack.common')

module.exports = {
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, '..', 'app'),
        exclude: /node_modules/,
        loader: 'babel',
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
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin([{
      'process.env':{
        'NODE_ENV': JSON.stringify('production'),
        'JWT_SECRET': JSON.stringify(envVars.JWT_SECRET),
        'MONGOLAB_URI': JSON.stringify(envVars.MONGOLAB_URI),
        'NPM_PRODUCTION': JSON.stringify(envVars.NPM_PRODUCTION)
      }
    }])
  ]
}
