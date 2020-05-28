import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG': {
      return [...state, action.data]
    }
    case 'LIKE_BLOG': {
      const { id } = action.data

      const likedBlog = state.find((blog) => blog.id === id)
      const updatedBlog = {
        ...likedBlog,
        likes: likedBlog.likes + 1,
      }

      return state.map((blog) => (blog.id !== id ? blog : updatedBlog))
    }
    case 'DELETE_BLOG': {
      const { id } = action.data
      return state.filter((blog) => blog.id !== id)
    }
    case 'NEW_COMMENT': {
      const { id } = action.data
      const { postId } = action.data
      const { title } = action.data

      const blog = state.find((blog) => blog.id === postId)
      const newComment = { title, id }

      const updatedBlog = {
        ...blog,
        comments: [...blog.comments, newComment],
      }

      return state.map((blog) => (blog.id !== postId ? blog : updatedBlog))
    }
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = (data, user) => {
  return async (dispatch) => {
    let newBlog = await blogService.create(data)
    newBlog = { ...newBlog, user: { name: user.name } }
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const likeBlog = (id, likedBlog) => {
  return async (dispatch) => {
    await blogService.update(id, likedBlog)
    dispatch({
      type: 'LIKE_BLOG',
      data: { id },
    })
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: { id },
    })
  }
}

export const createComment = (id, comment) => {
  return async (dispatch) => {
    const postId = id
    let newComment = await blogService.addComment(id, comment)
    newComment = { ...newComment, postId }

    dispatch({
      type: 'NEW_COMMENT',
      data: newComment,
    })
  }
}

export default blogReducer
