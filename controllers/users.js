const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request,response,next) => {
  const body = request.body
  if(!body.username || !body.password || body.username.length < 4 || body.password.length < 4){
    return response.status(400).json({
      'error': 'invalid values for username or password'
    })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  try{
    let savedUser = await user.save()

    response.status(201).json(savedUser)
  }
  catch(e){
    response.status(400).end()
    next(e)
  }

})

usersRouter.get('/', async (request,response,next) => {
  try{
    let result = await User.find({})
      .populate('blogs',{ title:1, url:1, likes:1 })
    response.status(200).send(result)
  }
  catch(e){
    response.status(500).end()
  }
})

module.exports = usersRouter
