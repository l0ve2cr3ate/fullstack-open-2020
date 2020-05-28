import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './Blog.module.css'

const Blog = ({ blog }) => {
  return (
    <div data-cy="blog" className={styles.blog}>
      <Link
        className={styles.link}
        data-cy="link-to-blog"
        to={`/blogs/${blog.id}`}
      >
        <h2 className={styles.title}>{blog.title}</h2>

        <div>
          <span className={styles.posted}>Author: </span>
          <span className={styles.author}>{blog.author}</span>
        </div>
      </Link>
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
}
