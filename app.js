const express = require('express')
const hbs = require('hbs')
const app = express()
const parser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const booksController = require('./controllers/books')
const userController = require('./controllers/users')
const mongoose = require('mongoose')
const book = mongoose.model('book')

app.use(morgan('dev'))
app.use(cookieParser())

app.set('view engine', 'hbs')
app.use(parser.urlencoded({extended: true}))
app.use(parser.json())
app.use(methodOverride('_method'))
app.use('/assets', express.static('public'))

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'WDI-GENERAL-ASSEMBLY-EXPRESS'}))
app.use(flash())

const passport = require('passport')
const passportConfig = require('./config/passport')
passportConfig(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(function (req, res, next) {
  res.locals.currentUser = req.user
  next()
})

app.use('/books', booksController)
app.post('/search', (req, res) => {
  const bookTitle = req.body.bookTitle
  book.findOne({}).then(book => res.render('show', {bookTitle}))
  console.log((`${req.body.bookTitle}`))
  // res.json({})
  // book.findById({_id: req.params.id}).then(book => res.render('show', { book }))
})

app.use('/user', userController)

app.set('port', process.env.PORT || 4004)
app.listen(app.get('port'), () => {
  console.log(`✅ PORT: ${app.get('port')} 🌟`)
})
