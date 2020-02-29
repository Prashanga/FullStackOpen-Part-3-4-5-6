const appRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

appRouter.get('/',async (request, response) => {
  let result = await Blog.find({})
    .populate('user',{ name:1 })
  response.status(200).json(result)

})


appRouter.post('/', async (request, response,next) => {

  const body = request.body

  if(!request.token ){
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  try{
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id){
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog(
      {
        ...body,
        author: user.name,
        date: new Date(),
        user: user._id
      })

    try{
      let result = await blog.save()

      user.blogs = user.blogs.concat(result._id)
      await user.save()

      response.status(201).json(result)

    }
    catch(e){
      next(e)
    }
  }
  catch(e){
    next(e)
  }

})

appRouter.delete('/', async (request,response,next) => {
  try{
    const body = request.body

    if(!request.token ){
      return response.status(401).json({ error: 'authorization failed' })
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id){
      return response.status(401).json({ error: 'authorizatin failed' })
    }

    const blog = await Blog.findById(body.id)
    if(!blog){
      return response.status(404).json({ 'error': 'no blog flound that matches the given criterion' })
    }

    if(blog.user.toString() === decodedToken.id.toString()){
      // Author of the blog is the one who's loggeed in
      const result =  await Blog.deleteOne({
        _id: body.id
      })

      if(result.deletedCount === 1){
        response.status(204).end()
      }
      else{
        response.status(500).end()
      }

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