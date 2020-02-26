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

appRouter.delete('/', async (request,response,next) => {
  try{
    const result =  await Blog.deleteOne({
      title: request.body.title
    })
    if(result.deletedCount === 1){
      response.status(204).end()
    }
    else{
      response.status(404).end()
    }
  }
  catch(e) {
    next(e)
  }
})

module.exports = appRouter