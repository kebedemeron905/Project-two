const book = require('../models/book')

const seedData = require('./seedData.json')

book.remove({})
  .then(() => {
    return book.collection.insert(seedData)
  })
  .then(() => {
    process.exit()
  })
