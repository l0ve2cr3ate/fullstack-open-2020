import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { FaRegHeart } from 'react-icons/fa'
import Button from './Button'
import Comment from './Comment'
import styles from './BlogView.module.css'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import CommentForm from './CommentForm'

const BlogView = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.login)

  const dispatch = useDispatch()
  const history = useHistory()

  const match = useRouteMatch('/blogs/:id')
  const blog = match ? blogs?.find((blog) => blog.id === match.params.id) : null

  const addLike = async () => {
    try {
      const { id, author, url, title } = blog
      const updatedBlog = {
        user: blog.user?.id || blog.user,
        likes: blog.likes + 1,
        title,
        author,
        url,
      }

      dispatch(likeBlog(id, updatedBlog))
    } catch (err) {
      console.error(err)
      dispatch(
        setNotification(
          {
            error: `No nooo! ${err}`,
          },
          5,
        ),
      )
    }
  }

  const deleteBlog = async (id, blog) => {
    try {
      if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
        // delete blog from db
        dispatch(removeBlog(id))
        history.push(`/blogs`)
        dispatch(
          setNotification(
            {
              notification: `Successfully removed ${blog.title} by ${blog.author}`,
            },
            5,
          ),
        )
      }
    } catch (err) {
      console.error(err)
      dispatch(setNotification({ error: `No nooo! ${err}` }, 5))
    }
  }

  if (!blog) {
    return null
  }
  return (
    <>
      <div className={styles.blogContainer}>
        <h1 className={styles.title}>{blog.title}</h1>
        <div className={styles.author}>{blog.author}</div>
        <a className={styles.url} href={blog.url}>
          {blog.url}
        </a>
        <div className={styles.infoContainer}>
          <span data-cy="likes" className={styles.likes}>
            {blog.likes}
          </span>
          <Button dataCy="like-btn" onClick={addLike} className={styles.btn}>
            <FaRegHeart size={'0.9em'} className={styles.likeIcon} />
          </Button>
          <span className={styles.dot}> &#8226;</span>
          <span className={styles.addedBy}>Added by </span>
          <span className={styles.user}>{blog.user?.name}</span>
        </div>
        {blog.user?.username === user?.username && (
          <Button
            onClick={() => deleteBlog(blog.id, blog)}
            className={styles.removeBtn}
            type="button"
          >
            Remove
          </Button>
        )}
      </div>

      <h2 className={styles.commentTitle}>Comments</h2>
      <CommentForm />
      {blog.comments && blog.comments.length !== 0 ? (
        <ul className={styles.commentList}>
          {blog.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </ul>
      ) : (
        <span>Add the first comment for this blog</span>
      )}
    </>
  )
}

export default BlogView
