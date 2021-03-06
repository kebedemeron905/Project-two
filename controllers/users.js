var express = require('express')
const router = require('express').Router()
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var passport = require('passport')

router.get('/signup', (req, res) => {
  res.render('signup', {
    message: req.flash('signupMessage')
  })
})

router.post('/signup', (req, res) => {
  const signupStrategy = passport.authenticate('local-signup', {
    successRedirect: '/books',
    failureRedirect: '/user/signup',
    failureFlash: true
  })
  return signupStrategy(req, res)
})

router.post('/login', (req, res) => {
  const loginStrategy = passport.authenticate('local-login', {
    successRedirect: '/books',
    failureRedirect: '/user/login',
    failureFlash: true

  })
  return loginStrategy(req, res)
})

router.get('/login', (req, res) => {
  res.render('login.hbs', { message: req.flash('loginMessage') })
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/books')
})

module.exports = router
