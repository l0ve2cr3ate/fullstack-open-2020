const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blogs')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

describe('when there are some blogs save initially', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map((r) => r.title)

    expect(titles).toContain('React patterns')
  })

  test('blogs should contain id property (not _id)', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('addition of new blog', () => {
  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'New blog',
      author: 'Jane Doe',
      url: 'http://dummyurl.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((b) => b.title)

    expect(titles).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('New blog')
  })

  test('if like property is misssing from req, it will default to value 0', async () => {
    const newBlog = {
      title: 'Another blog',
      author: 'Jane Doe',
      url: 'http://dummyurl.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0)
  })

  test('blog without title or url is not added', async () => {
    const newBlog = {
      likes: 12,
    }

    await api.post('/api/blogs').send(newBlog).expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
