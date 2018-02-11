'use strict'

const express = require('express'),
  app = express(),
  path = require('path'),
  webpack = require('webpack'),
  bodyParser = require('body-parser'),
  webpackDevMiddleware = require('webpack-dev-middleware'),
  webpackHotMiddleware = require('webpack-hot-middleware'),
  winston = require('winston');

const devConfig = require('../config/webpack.dev.config'),
  configRoutes = require('./routes'),
  connectDb = require('./db/config'),
  appConfig = require('./config/config');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//app.use('/discovery/**', proxy({ target: process.env.TICKETMASTER_URL, changeOrigin: true }))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(configRoutes(app));

if(appConfig.app.env === 'dev'){
  const compiler = webpack(devConfig);
  const middleware = webpackDevMiddleware(compiler, {
    publicPath: devConfig.output.publicPath,
    contentBase: 'app',
    hot: true,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: true,
      chunkModules: false,
      modules: false,
    },
    historyApiFallback: true
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }));

  // need to refactor for route get * cuz navigation via url doesn't function
  app.get('*', (req, res) => {
    res.end(middleware.fileSystem.readFileSync(path.join(devConfig.output.path, '/index.html')));
  });
} else {
    app.use(express.static(path.join(__dirname, '..', 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '..', 'dist/index.html'))
    });
}

app.listen(appConfig.app.port, (err) => {
  if(err) console.log('error on server: ', err);
  winston.info(`Server started and listening at ${appConfig.app.port}`);
});
