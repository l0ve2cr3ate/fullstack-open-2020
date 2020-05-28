import React from 'react'
import styles from './Comment.module.css'

const Comment = ({ comment }) => (
  <li className={styles.comment}>{comment.title}</li>
)

export default Comment
