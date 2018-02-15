'use strict'

const express = require('express'),
  app = express(),
  path = require('path'),
  webpack = require('webpack'),
  bodyParser = require('body-parser'),
  webpackDevMiddleware = require('webpack-dev-middleware'),
  webpackHotMiddleware = require('webpack-hot-middleware'),
  winston = require('winston'),
  proxy = require('http-proxy-middleware'),
  urlLib = require('url'),
  cors = require('cors');

const devConfig = require('../config/webpack.dev.config'),
  configRoutes = require('./routes'),
  appConfig = require('./config/config');

//app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

console.log('whatthefuk', appConfig)
app.use('/discovery/**', proxy({ target: appConfig.external.ticketmaster.baseUrl, changeOrigin: true }))
//app.use('/api/**', proxy({ target: urlLib.format(appConfig.app.url) }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(configRoutes(app));

if(process.env.NODE_ENV === 'dev'){
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

app.listen(appConfig.app.url.port, (err) => {
  if (err) throw new Error(`error on server: ${err.message}`);
  winston.info(`Server started and listening at ${appConfig.app.url.port}`);
});
