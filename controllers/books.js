const router = require('express').Router()
const express = require('express')
const book = require('../models/book.js')
const mongoose = require('../db/connection.js')
const commentSchema = require('../models/comment.js')
const comment = mongoose.model('Comment', commentSchema)

router.get('/', (req, res) => {
  book.find({}).then(books => res.render('index', {books}))
})

router.get('/:id', (req, res) => {
  book.findById({_id: req.params.id}).then(book => res.render('show', { book }))
})

module.exports = router
