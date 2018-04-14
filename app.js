const express = require('express')
const hbs = require('hbs')
const app = express()

const booksController = require('./controllers/books')
app.set('view engine', 'hbs')

app.use('/', booksController)
app.listen(4004, () => console.log('Running on port 4004!'))
