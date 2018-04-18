const mongoose = require('../db/connection')
const commentSchema = require('./comment.js')

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genera: String,
  published: String,
  reflection: String,
  url: String,
  comments: [commentSchema]
})

const book = mongoose.model('book', bookSchema)
module.exports = book
