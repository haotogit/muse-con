var webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    envVar = require('../server/env')

var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, '..', 'app/index.html'),
  inject: 'body',
  filename: 'index.html'
})

module.exports = {
  cache: true,
  debug: true,
  devtool: 'eval-source-map',
  entry: [
    path.join(__dirname, '..', 'app'),
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
  ],
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, '..', 'app'),
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          'presets': ['react', 'es2015', 'stage-0', 'react-hmre']
        }
      }
    ]
  },
  resolve: {
    root: [path.join(__dirname, '..', 'app')],
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('develop'),
        'FOURSQ_CLIENT_ID': JSON.stringify(envVar['FOURSQ_CLIENT_ID']),
        'FOURSQ_CLIENT_SECRET': JSON.stringify(envVar['FOURSQ_CLIENT_SECRET']),
        'FOURSQ_API': JSON.stringify(envVar['FOURSQ_API']),
        'BASE_URI': JSON.stringify(envVar['BASE_URI'])
      }
    })
  ]
}
