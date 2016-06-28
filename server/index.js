import express from 'express'
import path from 'path'
import webpack from 'webpack'
import devConfig from '../webpack.config.js'
import bodyParser from 'body-parser'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import configRoutes from './routes'
import connect from './db/config'

const app = express()
const isDevelop = process.env.NODE_ENV !== 'production'
const port = isDevelop ? 3000 : process.env.PORT

if(isDevelop){
  const compiler = webpack(devConfig)
  const middleware = webpackMiddleware(compiler, {
    publicPath: devConfig.output.publicPath,
    contentBase: 'app',
    hot: true,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
    proxy: {
      '/api': 'http://localhost:3000'
    }
  })

  connect()
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))

  app.use(configRoutes(app))
  app.get('/', function(req, res){
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')))
    res.end()
  })

}

app.listen(port)

