//  Add your code here
const { model, Schema } = require('mongoose')

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
})

const User = model('User', UserSchema)

module.exports = User
