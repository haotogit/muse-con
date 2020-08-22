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
if (process.env.NODE_ENV === 'dev') {
  let devEntries = [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
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
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
			{
        test: /\.jsx?$/,
				use: 'react-hot-loader/webpack',
				include: /node_modules/
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000',
      },
      {
        test: /\.(ttf|eot|svg|png|gif)(\?[\s\S]+)?$/,
        loader: 'file-loader?name=[name].[ext]'
      },
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.LoaderOptionsPlugin({
      postcss: [autoprefixer]
    })
  ]
};
