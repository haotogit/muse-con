import mongoose from 'mongoose'
import bluebird from 'bluebird'

mongoose.Promise = bluebird

const Schema = mongoose.Schema

const GenresSchema = new Schema({
  name: { type: String, unique: true },
  artists: [{ type: Schema.Types.ObjectId, ref: 'Artists' }]
})

const Genres = mongoose.model('Genres', GenresSchema)

export default Genres
