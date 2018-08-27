var webpack = require('webpack'),
    path = require('path'),
    envVar = require('../server/env'),
    webpackMerge = require('webpack-merge'),
    commonConfig = require('./webpack.common');

module.exports = webpackMerge(commonConfig, {
  cache: true,
  entry: [
    'react-hot-loader/patch',
    path.join(__dirname, '..', 'app/index.jsx')
  ],
  devtool: 'inline-source-map',
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
        use: {
          loader: 'babel-loader',
          query: {
            'presets': ['react', 'es2015', 'stage-0', 'react-hmre']
          }
        }
      }
    ]
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
    //proxy: {
    //'https://accounts.spotify.com/**': {
    //  target: 'https://accounts.spotify.com',
    //  changeOrigin: true
    //}
  },
  plugins: [
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
