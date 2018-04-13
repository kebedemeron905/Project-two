const mongoose = require('../db/connection.js')

const commentSchema = new mongoose.Schema({
  comment: String,
  name: String
})

module.exports = commentSchema
