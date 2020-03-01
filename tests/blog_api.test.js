const mongoose = require('mongoose')
const supertest =  require('supertest')
const app = require('../app')
//const bcrypt = require('bcrypt')
const api = supertest(app)
const Blog = require('../models/blog')
//const User = require('../models/user')

const initialBlogs = [ { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }, { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 }, { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }, { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 }]

// beforeAll(
//   async () => {
//     await Blog.deleteMany({})

//     let blogObject = new Blog(initialBlogs[0])
//     await blogObject.save()

//     blogObject = new Blog(initialBlogs[1])
//     await blogObject.save()

//     blogObject = new Blog(initialBlogs[2])
//     await blogObject.save()

//     blogObject = new Blog(initialBlogs[3])
//     await blogObject.save()

//   }
// )

beforeEach(
  async () => {
    await Blog.deleteMany({})
  }
)

describe('get blogs and users', () => {



  test('blogs are returned as json + there are four blogs', async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[3])
    await blogObject.save()

    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(initialBlogs.length)
  })

})



test('id is a unique identifier', async () => {
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  const response = await api.get('/api/blogs')
  response.body.map(blog => {
    expect(blog.id).toBeDefined()
  })

})

describe('making post requests', () => {

  // test('posting new user', async () => {

  //   let newUser = {
  //     username: "test",
  //     name: "Test",
  //     password: "test"
  //   }

  //   let result = await api
  //     .post('/api/users')
  //     .send(newUser)
  //     .expect(201)

  //   expect(result.body.username).toEqual('test')

  //   console.log(result.body)
  // })

  test('blog post request works', async () => {
    const newBlog = {
      title:'Testing Post Request',
      url:'test'
    }

    await api
      .post('/api/blogs')
      .set('authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjVlNWI0NDY1MjhjMDJjMjkwNDZkNzJmMSIsImlhdCI6MTU4MzAzOTc2Nn0.AIras_5cBq9i4obNOJmoTS27MFsuKFQdyTHzmD-6Mn8')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)


    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(1)
    expect(response.body[0].author).toBe('Test')

  },10000)


  test('no likes equals 0 likes', async () => {

    const newBlog = {
      title:'Testing 0 likes',
      url:'test',
    }

    await api.post('/api/blogs')
      .set('authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjVlNWI0NDY1MjhjMDJjMjkwNDZkNzJmMSIsImlhdCI6MTU4MzAzOTc2Nn0.AIras_5cBq9i4obNOJmoTS27MFsuKFQdyTHzmD-6Mn8')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body[0].likes).toBe(0)
    expect(response.body[0].title).toBe('Testing 0 likes')

  })

  test('posts must include title and url', async () => {
    const newBlog = {
      author:'Test'
    }
    await api.post('/api/blogs')
      .send(newBlog)
      .set('authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjVlNWI0NDY1MjhjMDJjMjkwNDZkNzJmMSIsImlhdCI6MTU4MzAzOTc2Nn0.AIras_5cBq9i4obNOJmoTS27MFsuKFQdyTHzmD-6Mn8')
      .expect(400)

  })
})

describe('deleting a blog', () => {

  test('deleting a blog by title', async () => {

    await Blog.deleteMany({})

    let newBlog = {
      title: "Hello Blog 6",
      url: "www.www2.com",
      likes: 5
    }

    await api.post('/api/blogs')
      .set('authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjVlNWI0NDY1MjhjMDJjMjkwNDZkNzJmMSIsImlhdCI6MTU4MzAzOTc2Nn0.AIras_5cBq9i4obNOJmoTS27MFsuKFQdyTHzmD-6Mn8')
      .send(newBlog)
      .expect(201)


    await api.delete('/api/blogs')
      .set('authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjVlNWI0NDY1MjhjMDJjMjkwNDZkNzJmMSIsImlhdCI6MTU4MzAzOTc2Nn0.AIras_5cBq9i4obNOJmoTS27MFsuKFQdyTHzmD-6Mn8')
      .send( { "title":"Hello Blog 6" } )
      .expect(204)

    let result = await api.get('/api/blogs')
    expect(result.body.length).toBe(0)
  })
})

describe('modifying blog', () => {

  test('modifying likes', async () => {

    await Blog.deleteMany({})

    let newBlog = {
      title: "Hello Blog 6",
      url: "www.www2.com",
      likes: 5
    }

    await api.post('/api/blogs')
      .set('authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjVlNWI0NDY1MjhjMDJjMjkwNDZkNzJmMSIsImlhdCI6MTU4MzAzOTc2Nn0.AIras_5cBq9i4obNOJmoTS27MFsuKFQdyTHzmD-6Mn8')
      .send(newBlog)
      .expect(201)

    await api.put('/api/blogs/likes')
      .send({
        title: "Hello Blog 6",
        likes: 4200
      })
      .set('authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjVlNWI0NDY1MjhjMDJjMjkwNDZkNzJmMSIsImlhdCI6MTU4MzAzOTc2Nn0.AIras_5cBq9i4obNOJmoTS27MFsuKFQdyTHzmD-6Mn8')
      .expect(200)


    let result = await api.get('/api/blogs')
    //console.log(result.body)
    expect(result.body[0].likes).toBe(4200)
  })
})



afterAll(() => {
  mongoose.connection.close()

})