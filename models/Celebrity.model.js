//  Add your code here
const { model, Schema } = require('mongoose')

const CelebritySchema = new Schema({
  name: String,
  occupation: String,
  catchPhrase: String,
})

const Celebrity = model('Celebrity', CelebritySchema)

module.exports = Celebrity
