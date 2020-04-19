import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './Blog.module.css'
import Button from './Button'

const Blog = ({ blog, updateLike, removeBlog, user }) => {
  const [expanded, setExpanded] = useState(false)
  const [postedBy, setPostedBy] = useState('')
  const [username, setUsername] = useState('')

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const update = () => {
    const { id, author, url, title } = blog
    const updatedBlog = {
      user: blog.user?.id || blog.user,
      likes: blog.likes + 1,
      title,
      author,
      url,
    }

    setPostedBy(postedBy || blog.user?.name)
    setUsername(username || blog.user?.username)
    updateLike(id, updatedBlog)
  }

  const deleteBlog = () => {
    const { id } = blog

    removeBlog(id)
  }

  return (
    <div data-cy="blog" className={styles.blog}>
      <span className={styles.title}>{blog.title}</span>
      <span className={styles.posted}>Author: </span>
      <span className={styles.author}>{blog.author}</span>
      <Button
        onClick={toggleExpanded}
        className={expanded ? styles.hide : styles.btn}
      >
        View
      </Button>
      <Button
        onClick={toggleExpanded}
        className={expanded ? styles.btn : styles.hide}
      >
        Hide
      </Button>
      <div data-testid="hidden-content" className={expanded ? '' : styles.hide}>
        <div>
          <span className={styles.url}>{blog.url}</span>
        </div>

        <span className={styles.likesText}>Likes</span>
        <span data-cy="likes" className={styles.likes}>
          {blog.likes}
        </span>
        <Button dataCy="like-btn" onClick={update} className={styles.btn}>
          Like
        </Button>
        <div>
          <span className={styles.posted}>Posted by: </span>
          <span className={styles.author}> {blog.user?.name || postedBy}</span>
        </div>
        {(blog.user?.username === user.username ||
          username === user.username) && (
          <Button onClick={deleteBlog} className={styles.removeBtn}>
            Remove
          </Button>
        )}
      </div>
    </div>
  )
}

export default Blog

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number,
  }),
  updateLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string,
    username: PropTypes.string,
    name: PropTypes.string,
  }),
}
