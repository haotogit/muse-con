var webpack = require('webpack'),
    path = require('path'),
    webpackMerge = require('webpack-merge'),
    miniCssExtractPlugin = require('mini-css-extract-plugin');
    commonConfig = require('./webpack.common'),

module.exports = webpackMerge(commonConfig, {
  cache: true,
  mode: 'development',
  devtool: 'inline-source-map',
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  devServer: {
    contentBase: path.join(__dirname, '..', 'dist'),
		compress: true,
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
      'Access-Control-Allow-Origin': 'localhost'
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
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'TICKETMASTER_URL': JSON.stringify(process.env.TICKETMASTER_URL),
        'TICKETMASTER_KEY': JSON.stringify(process.env.TICKETMASTER_KEY),
        'API_PROTOCOL': JSON.stringify(process.env.API_PROTOCOL),
        'API_HOST': JSON.stringify(process.env.API_HOST),
      }
    }),
  ]
})
