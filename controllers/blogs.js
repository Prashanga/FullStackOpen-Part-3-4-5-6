const appRouter = require('express').Router()
const Blog = require('../models/blog')

appRouter.get('/',async (request, response) => {
  let result = await Blog.find({})
  response.status(200).json(result)

})

appRouter.post('/', async (request, response,next) => {
  const blog = new Blog(request.body)
  try{
    let result = await blog.save()
    response.status(201).json(result)
  }
  catch(e){
    next(e)
  }

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

appRouter.put('/likes', async (request,response,next) => {
  try{
    const newLikes = request.body.likes
    Blog.findById(request.body.id, async (err, blog) => {
      if(err){
        response.status(400).json({ 'error':'malformatted id' })
      }
      else{
        blog.likes = newLikes
        await blog.save()
        response.status(200)
          .json(blog)
      }
    })
  }
  catch(e) {
    next(e)
  }
})

module.exports = appRouter