const express = require('express')
const hbs = require('hbs')
const app = express()
const parser = require('body-parser')
const booksController = require('./controllers/books')
app.set('view engine', 'hbs')

app.use(parser.urlencoded({extended: true}))
app.use('/', booksController)
app.listen(4004, () => console.log('Running on port 4004!'))
