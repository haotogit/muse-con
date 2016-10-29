import mongoose from 'mongoose'
import bluebird from 'bluebird'

mongoose.Promise = bluebird

const mongoose = mongoose.Schema

const ArtistsSchema = new Schema ({
  name: String,
  image: String,
  genres: [{ type: Schema.Types.ObjectId, ref: 'Genres' }]
})

const Artists = mongoose.model('Artists', ArtistsSchema)

export default Artists
