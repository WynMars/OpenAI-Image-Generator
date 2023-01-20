const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imgSchema = new Schema({
  prompt: String,
  image_url: String
})

module.exports = mongoose.model('OpenAIimage', imgSchema)
