
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/bookshelv_db')
mongoose.Promise = Promise

module.exports = mongoose