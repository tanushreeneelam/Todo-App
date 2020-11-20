const mongoose = require('mongoose')

//ref- users (from mongoDB - collection name is users)
const guestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
  },
  diet: {
    type: String,
    default: 'non-veg'
  },
  isconfirmed: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('guest', guestSchema)