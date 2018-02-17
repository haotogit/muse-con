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
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'TICKETMASTER_URL': JSON.stringify(process.env.TICKETMASTER_URL),
        'TICKETMASTER_KEY': JSON.stringify(process.env.TICKETMASTER_KEY),
        'SERVER_PROTOCOL': JSON.stringify(process.env.SERVER_PROTOCOL),
        'SERVER_HOSTNAME': JSON.stringify(process.env.SERVER_HOSTNAME),
        'API_PROTOCOL': JSON.stringify(process.env.API_PROTOCOL),
        'API_HOST': JSON.stringify(process.env.API_HOST)
      }
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      moment: 'moment'
    }),
    new webpack.LoaderOptionsPlugin({
      postcss: [autoprefixer]
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['app', 'vendor'],
      minChunks: 2
    })
  ]
}
