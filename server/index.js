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

app.use('/discovery/**', proxy({ target: appConfig.external.ticketmaster.baseUrl, changeOrigin: true }))
app.use('/api/**', proxy({ target: urlLib.format(appConfig.app.url), changeOrigin: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(configRoutes(app));

if(process.env.NODE_ENV === 'prod'){
  app.use(express.static(path.join(__dirname, '..', 'dist')));
  //app.get('*', (req, res) => {
  //  res.sendFile(path.join(__dirname, '..', 'dist/index.html'))
  //});
}

app.listen(appConfig.app.url.port, (err) => {
  if (err) throw new Error(`error on server: ${err.message}`);
  winston.info(`Server started and listening at ${appConfig.app.url.port}`);
});
