import mongoose from 'mongoose'

const Schema = mongoose.Schema

const companySchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  social_media: [{ type: Schema.Types.ObjectId, ref: 'SocialMedia' }],
  employees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  clients: [{ type: Schema.Types.ObjectId, ref: 'Clients' }]
})

const Company = mongoose.model('Company', companySchema)

export default Company
