const mongoose = require('mongoose')
const supertest =  require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [ { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }, { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 }, { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }, { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 }]

beforeEach(
  async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[3])
    await blogObject.save()
  }
)

describe('get blogs', () => {
  test('blogs are returned as json', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-type', /application\/json/)
  })

  test('there are four blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(initialBlogs.length)
  })

})



test('id is a unique identifier', async () => {
  const response = await api.get('/api/blogs')
  response.body.map(blog => {
    expect(blog.id).toBeDefined()
  })

})

describe('making post requests', () => {
  test('post request works', async () => {
    const newBlog = {
      _id:'5b422a851b54a676234d17f9',
      title:'Testing Post Request',
      author:'Test',
      url:'test',
      likes:0,
      __v:0
    }
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length+1)
    expect(response.body[4].author).toBe('Test')

  })

  test('no likes equals 0 likes', async () => {
    const newBlog = {
      _id:'5b422a851b54a676234d17f9',
      title:'Testing 0 likes',
      author:'Test',
      url:'test',
      __v:0
    }
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length+1)
    expect(response.body[4].likes).toBe(0)

  })

  test('posts must include title and url', async () => {
    const newBlog = {
      _id:'5b422a851b54a676234d17f9',
      author:'Test',
      __v:0
    }
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(400)

  })
})



afterAll(() => {
  mongoose.connection.close()
})