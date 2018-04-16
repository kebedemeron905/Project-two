const router = require('express').Router()
const express = require('express')

const book = require('../models/book.js')
const mongoose = require('../db/connection.js')
const commentSchema = require('../models/comment.js')
const Comment = mongoose.model('Comment', commentSchema)

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

router.get('/edit/:id', (req, res) => {
  book.findById({_id: req.params.id})
    .then(book => {
      res.render('edit', {book})
    })
})

router.put('/:id', (req, res) => {
  book.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then(book => {
      res.redirect('/')
    })
})

router.delete('/:id', (req, res) => {
  book.findOneAndRemove({_id: req.params.id})
    .then(() => {
      res.redirect('/')
    })
})

router.post('/:id', (req, res) => {
  let newcomment = new Comment(req.body)
  book.findById({_id: req.params.id})
    .then((book) => {
      book.comments.push(newcomment)
      book.save()
        .then(() => {
          res.redirect(`/${req.params.id}`)
        })
    })
})

router.delete('/:id/:commentid', (req, res) => {
  book.findById({_id: req.params.id})
    .then((book) => {
      book.comments.pull(req.params.commentid)
      book.save()
        .then(() => {
          console.log(req.params.commentid)
          res.redirect(`/${req.params.id}`)
        })
    })
})
module.exports = router
