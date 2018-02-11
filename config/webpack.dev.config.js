var webpack = require('webpack'),
    path = require('path'),
    envVar = require('../server/env'),
    webpackMerge = require('webpack-merge'),
    commonConfig = require('./webpack.common'),
    dotenv = require('dotenv')

dotenv.config()

module.exports = webpackMerge(commonConfig, {
  cache: true,
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?path=__webpack_hmr&timeout=20000',
    path.join(__dirname, '..', 'app/index.jsx')
  ],
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: {
            'presets': ['react', 'es2015', 'stage-0', 'react-hmre']
          }
        }
      }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'envVars': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'TICKETMASTER_URL': JSON.stringify(process.env.TICKETMASTER_URL),
        'TICKETMASTER_KEY': JSON.stringify(process.env.TICKETMASTER_KEY)
      }
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ]
})
