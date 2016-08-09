import 'babel-polyfill'
import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import webpack from 'webpack'
import devConfig from '../webpack/webpack.dev.config'
import bodyParser from 'body-parser'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import configRoutes from './routes'
import connect from './db/config'
import morgan from 'morgan'
import expressSession from 'express-session'

dotenv.config()
const app = express()
const isDevelop = process.env.NODE_ENV !== 'production'
const port = isDevelop ? 3000 : process.env.PORT

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(configRoutes(app))

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
      chunks: true,
      chunkModules: false,
      modules: false,
    }
  })

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))
  app.use(morgan('dev'))

  // need to refactor for route get * cuz navigation via url doesn't function
  app.get('*', (req, res) => {
    res.end(middleware.fileSystem.readFileSync(path.join(devConfig.output.path, '/index.html')))
  })
} else {
    app.use(express.static(path.join(__dirname, '..', 'dist')))
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist/index.html'))
    })
}

app.listen(port, (err) => {
  if(err) console.log('error on server: ', err)
  console.info(`Listening on ${port}, ${isDevelop ? 'develop' : 'prod' }`)
})

