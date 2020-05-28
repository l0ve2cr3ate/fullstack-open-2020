import React from 'react'
import PropTypes from 'prop-types'
import styles from './Notification.module.css'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => state.notification)

  if (!message || (!message?.notification && !message?.error)) return null

  return (
    <div className={message?.error ? styles.error : styles.notification}>
      {message?.notification ? message?.notification : message?.error}
    </div>
  )
}

export default Notification

Notification.propTypes = {
  className: PropTypes.string,
}
