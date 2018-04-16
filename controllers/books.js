const router = require('express').Router()
const express = require('express')
const book = require('../models/book.js')
const mongoose = require('../db/connection.js')
const commentSchema = require('../models/comment.js')
const comment = mongoose.model('Comment', commentSchema)

router.get('/', (req, res) => {
  book.find({}).then(books => res.render('index', {books}))
})

router.get('/new', (req, res) => {
  res.render('new')
})
router.post('/', (req, res) => {
  console.log(req.body)
  book.create(req.body)
    .then(book => {
      res.redirect('/')
    })
})
router.get('/:id', (req, res) => {
  book.findById({_id: req.params.id}).then(book => res.render('show', { book }))
})

module.exports = router
