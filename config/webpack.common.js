const webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  path = require('path'),
  autoprefixer = require('autoprefixer'),
  extractTextPlugin = require('extract-text-webpack-plugin');

var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, '..', 'app/index.html'),
  inject: 'body',
  filename: 'index.html'
});

module.exports = {
  entry: {
    'app': path.join(__dirname, '..', 'app')
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name]-[hash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', 'scss']
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?importLoaders=1'
        })
      },
      {
        test: /\.(sass|scss)$/,
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file-loader?name=[name].[ext]'
      },
      { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },
    ]
  },
  plugins: [
    new extractTextPlugin('styles.css'),
    HtmlWebpackPluginConfig,
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      moment: 'moment'
    }),
    new webpack.LoaderOptionsPlugin({
      postcss: [autoprefixer]
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['app', 'vendor', 'config'],
      minChunks: 2
    })
  ]
}
