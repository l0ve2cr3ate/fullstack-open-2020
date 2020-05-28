import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from './Button'
import { logout } from '../reducers/loginReducer'
import { NavLink, useHistory } from 'react-router-dom'
import styles from './Navbar.module.css'

const Navbar = () => {
  const user = useSelector((state) => state.login)

  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBloglistUser')
    dispatch(logout())
    history.push('/')
  }

  if (user) {
    return (
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink
              activeClassName={styles.activeLink}
              className={styles.navLink}
              to={`/blogs`}
            >
              blogs
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              activeClassName={styles.activeLink}
              className={styles.navLink}
              to={`/users`}
            >
              users
            </NavLink>
          </li>
        </ul>

        <ul className={`${styles.navList} ${styles.navListSecondary}`}>
          <li className={styles.navItem}>
            <span className={styles.user}>{user?.name} logged in</span>
          </li>
          <li className={styles.navItem}>
            <Button
              onClick={handleLogout}
              className={styles.logoutBtn}
              type="button"
            >
              Logout
            </Button>
          </li>
        </ul>
      </nav>
    )
  } else {
    return (
      <nav className={styles.nav}>
        <Button
          onClick={handleLogout}
          className={styles.logoutBtn}
          type="button"
        >
          Login
        </Button>
      </nav>
    )
  }
}

export default Navbar
