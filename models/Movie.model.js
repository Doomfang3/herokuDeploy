//  Add your code here
const { model, Schema } = require('mongoose')
const Celebrity = require('./Celebrity.model')

const MovieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast: [{ type: Schema.Types.ObjectId, ref: Celebrity }],
})

const Movie = model('Movie', MovieSchema)

module.exports = Movie
