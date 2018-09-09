var webpack = require('webpack'),
    path = require('path'),
    webpackMerge = require('webpack-merge'),
    miniCssExtractPlugin = require('mini-css-extract-plugin');
    envVar = require('../server/env'),
    commonConfig = require('./webpack.common'),

module.exports = webpackMerge(commonConfig, {
  cache: true,
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '..', 'app/index.jsx')
  ],
  devtool: 'inline-source-map',
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  devServer: {
    contentBase: path.join(__dirname, '..', 'dist'),
    inline: true,
    hot: true,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: true,
      chunkModules: false,
      modules: false,
    },
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
    ]
  },
  plugins: [
    new miniCssExtractPlugin('[name].css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('dev'),
        'TICKETMASTER_URL': JSON.stringify(process.env.TICKETMASTER_URL),
        'TICKETMASTER_KEY': JSON.stringify(process.env.TICKETMASTER_KEY),
        'API_PROTOCOL': JSON.stringify(process.env.API_PROTOCOL),
        'API_HOST': JSON.stringify(process.env.API_HOST),
        'SPOTIFY_CLIENT_ID': JSON.stringify(process.env.SPOTIFY_CLIENT_ID),
        'SPOTIFY_CLIENT_SECRET': JSON.stringify(process.env.SPOTIFY_CLIENT_SECRET),
        'SPOTIFY_REDIRECT_URI': JSON.stringify(process.env.SPOTIFY_REDIRECT_URI),
      }
    }),
  ]
})
