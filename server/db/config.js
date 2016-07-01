import mongoose from 'mongoose'
import User from './models/user'

export default (isDevelop) => {

    const db = process.env.MONGOLAB_URI || isDevelop ? 'mongodb://localhost/test' : 'mongodb://localhost/express_prod'
    const options = {
        server: {
          socketOptions: { keepAlive: 1 }
        }
      }

    const connect = () => {
      mongoose.connect(db, options, (err) => {
        if (err) {
          console.log(`Error connecting to db: ${db}, error@: ${err}`)
        } else {
          console.log(`Connected to db: ${db}`)
        }
      })
    }
    connect()
    mongoose.connection.on('error', console.log)
    mongoose.connection.on('disconnected', connect)

}
