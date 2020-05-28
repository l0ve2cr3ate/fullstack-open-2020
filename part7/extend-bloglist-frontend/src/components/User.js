import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styles from './User.module.css'

const User = () => {
  const users = useSelector((state) => state.users)

  const match = useRouteMatch('/users/:id')
  const user = match ? users?.find((user) => user.id === match.params.id) : null

  if (!user) {
    return null
  }
  return (
    <>
      <h1 className={styles.user__title}>{user.name}</h1>
      <h2 className={styles.user__subTitle}>Added blogs</h2>
      {user.blogs.length === 0 ? (
        <p className={styles.user__listItem}>No blogs added yet.</p>
      ) : (
        <ul className={styles.user__list}>
          {user.blogs?.map((blog) => (
            <li className={styles.user__listItem} key={blog.id}>
              {blog.title}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default User
