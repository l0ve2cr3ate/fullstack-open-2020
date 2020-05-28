const commentsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blogs')
const Comment = require('../models/comments')

commentsRouter.get('/:id/comments', async (request, response) => {
  const { id } = request.params
  const blogWithComments = await Blog.findById(id).populate('comments')
  response.json(blogWithComments)
})

commentsRouter.post('/:id/comments', async (request, response) => {
  const { body } = request

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  // check for valid token
  if (!request.token || !decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  //   const user = await User.findById(decodedToken.id)

  const { id } = request.params

  const blog = await Blog.findById(id)

  const comment = new Comment({
    title: body.title,
  })

  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()
  //   user.blogs = user.blogs.concat(savedBlog._id)
  //   await user.save()

  response.status(201).json(savedComment.toJSON())
  //   response.status(201).json(savedBlog.toJSON())
})

module.exports = commentsRouter
