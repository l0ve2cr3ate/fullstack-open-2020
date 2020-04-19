import React from 'react'
import PropTypes from 'prop-types'
import styles from './Notification.module.css'

const Notification = ({ message, type }) => {
  if (!message) return null
  return (
    <div className={type === 'error' ? styles.error : styles.notification}>
      {message}
    </div>
  )
}

export default Notification

Notification.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
}
