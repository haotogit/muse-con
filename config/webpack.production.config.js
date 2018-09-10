var path = require('path'),
    webpack = require('webpack'),
    webpackMerge = require('webpack-merge'),
    miniCssExtractPlugin = require('mini-css-extract-plugin');
    commonConfig = require('./webpack.common'),

module.exports = webpackMerge(commonConfig, {
  mode: 'production',
  entry: {
    'app': path.join(__dirname, '..', 'app/index.jsx'),
    'config': path.join(__dirname, '..', 'server/config/config.js')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          miniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
    ]
  },
  plugins: [
    new miniCssExtractPlugin('[name].[hash].css'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'TICKETMASTER_URL': JSON.stringify('https://app.ticketmaster.com/discovery/v2'),
        'TICKETMASTER_KEY': JSON.stringify('MwOoif9Ac5iZFedZG7xMW368oRbghDAz'),
        'API_PROTOCOL': JSON.stringify('http'),
        'API_HOSTNAME': JSON.stringify('18.218.255.222'),
        'SPOTIFY_CLIENT_ID': JSON.stringify('967d0ee071fc41c99fcd12d6dc5718c0'),
        'SPOTIFY_CLIENT_SECRET': JSON.stringify('caf7a40f87d342ac8735618a93b3a44d'),
        'SPOTIFY_REDIRECT_URI': JSON.stringify('http://18.218.255.222:8087/api/v1/authSpotify/callback'),
      }
    })
  ],
  optimization: {
    minimize: true
  }
})
