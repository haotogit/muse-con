const webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  path = require('path'),
  autoprefixer = require('autoprefixer');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, '..', 'app/index.html'),
  inject: 'body',
  filename: 'index.html'
});

let entryArray = [
  '@babel/polyfill',
  path.join(__dirname, '..', 'app'),
];

// ran into errors because of hot loader not going in first
if (process.env.NODE_ENV === 'DEV') {
  let devEntries = [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
  ];

  for (let i = devEntries.length - 1; i >= 0; i--) {
    entryArray.unshift(devEntries[i]);
  }
}

module.exports = {
  entry: entryArray,
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
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
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
    HtmlWebpackPluginConfig,
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      moment: 'moment'
    }),
    new webpack.LoaderOptionsPlugin({
      postcss: [autoprefixer]
    })
  ]
};
