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

describe('viewing a specific blog', () => {
  test('a specific note can be viewed when using valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = mongoose.Types.ObjectId()

    await api.get(`/api/blogs/${validNonexistingId}`).expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5e8cae887f883f27e06f54a66'

    await api.get(`/api/blogs/${invalidId}`).expect(400)
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

describe('deletion of blog', () => {
  test('succeeds with status 402 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map((r) => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('updating of likes of blog', () => {
  test('succeeds with status 400 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()

    console.log({ blogsAtStart })
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 12 })
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    const updatedBlog = blogsAtEnd[0]

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    expect(updatedBlog.likes).toBe(12)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = mongoose.Types.ObjectId()

    await api
      .put(`/api/blogs/${validNonexistingId}`)
      .send({ likes: 12 })
      .expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5e8cae887f883f27e06f54a66'

    await api.put(`/api/blogs/${invalidId}`).send({ likes: 12 }).expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
