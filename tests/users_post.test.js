const mongoose = require('mongoose')
const supertest =  require('supertest')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  const user = new User({ username: 'root', name:'test', password: 'sekret' })
  await user.save()
})

describe('when there is initially one user at db', () => {


  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'prashanga',
      name: 'Prashanga',
      password: '12345',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('invalid username not allowed', async () => {
    const usersAtStart = await User.find({})

    let unsuccessfulUser = {
      username: '11',
      password: '12345',
      name: 'Unsuccessful'
    }

    const response = await api.post('/api/users')
      .send(unsuccessfulUser)
      .expect(400)

    expect(response.body).toEqual({ error: 'invalid values for username or password' })

    const usersAtEnd = await User.find({})

    expect(usersAtStart.length).toEqual(usersAtEnd.length)
    console.log(usersAtEnd.length,usersAtStart.length)
  })

  test('invalid password not allowed', async () => {
    const usersAtStart = await User.find({})

    let unsuccessfulUser = {
      username: 'test',
      password: '12',
      name: 'Unsuccessful'
    }

    const response = await api.post('/api/users')
      .send(unsuccessfulUser)
      .expect(400)

    expect(response.body).toEqual({ error: 'invalid values for username or password' })

    const usersAtEnd = await User.find({})

    expect(usersAtStart.length).toEqual(usersAtEnd.length)
    console.log(usersAtEnd.length,usersAtStart.length)
  })





})

afterAll(() => {
  mongoose.connection.close()
})