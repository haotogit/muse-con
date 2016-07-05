require('dotenv').load()

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

const app = express()
const isDevelop = process.env.NODE_ENV !== 'production'
const port = isDevelop ? 3000 : process.env.PORT

// connect mongodb at ../db/config
connect(isDevelop)
console.log('fuk: ', process.env.JWT_SECRET)

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

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))
  app.use(morgan('dev'))

  app.get('/', function(req, res){
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')))
    res.end()
  })
} else {
    app.use(express.static(path.join(__dirname, '..', 'dist')))
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist/index.html'))
    })
}

app.use(configRoutes(app))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, (err) => {
  if(err) console.log('error on server: ', err)
  console.info(`Listening on ${port}, ${isDevelop ? 'develop' : 'prod' }`)
})

