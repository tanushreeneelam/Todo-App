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
  desc: {
    type: String,
    default:''
  },
  priority: {
    type: String,
    default: '1'
    // required: false,
  },
  iscompleted: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('todo', guestSchema)