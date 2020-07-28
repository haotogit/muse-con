var path = require('path'),
    webpack = require('webpack'),
    webpackMerge = require('webpack-merge'),
    miniCssExtractPlugin = require('mini-css-extract-plugin');
    commonConfig = require('./webpack.common')
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),

module.exports = webpackMerge(commonConfig, {
  mode: 'production',
  entry: {
    'app': path.join(__dirname, '..', 'app/index.jsx')
  },
  module: {
    rules: [
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
      }
    }),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  }
})
