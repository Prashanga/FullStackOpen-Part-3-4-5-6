const appRouter = require('express').Router()
const Blog = require('../models/blog')

appRouter.get('/', (request, response) => {
  Blog.find({})
    .then(blogs => {
      response.status(200).json(blogs)
    })
})

appRouter.post('/', (request, response,next) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(err => next(err))
})

module.exports = appRouter