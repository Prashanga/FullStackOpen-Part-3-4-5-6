const appRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

appRouter.get('/',async (request, response) => {
  let result = await Blog.find({})
    .populate('user',{ name:1 })
  response.status(200).json(result)

})

const getToken = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

appRouter.post('/', async (request, response,next) => {

  const body = request.body


  const token = getToken(request)
  if(!token ){
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  try{
    const decodedToken = jwt.verify(token, process.env.SECRET)
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