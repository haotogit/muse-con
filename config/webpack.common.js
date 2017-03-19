var webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    path = require('path'),
    autoprefixer = require('autoprefixer')
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, '..', 'app/index.html'),
  inject: 'body',
  filename: 'index.html'
})

module.exports = {
  entry: {
    'app': path.join(__dirname, '..', 'app'),
    'vendor': path.join(__dirname, '..', 'app/vendor')
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name]-[hash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.scss/, exclude: /node_modules/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!sass?outputStyle=expanded&sourceMap&includePaths[]=node_modules/compass-mixins/lib'},
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file-loader?name=[name].[ext]'
      },
      { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      alertify: 'alertifyjs'
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
