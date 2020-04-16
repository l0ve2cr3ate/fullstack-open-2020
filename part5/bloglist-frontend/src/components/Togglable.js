import React, { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import styles from './Togglable.module.css'

const Togglable = forwardRef(({ btnText, children }, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <>
      <Button
        className={visible ? styles.hide : styles.btn}
        type="button"
        onClick={toggleVisibility}
      >
        {btnText}
      </Button>

      <div className={visible ? '' : styles.hide}>
        {children}
        <Button
          className={styles.cancelBtn}
          type="button"
          onClick={toggleVisibility}
        >
          Cancel
        </Button>
      </div>
    </>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable

Togglable.propTypes = {
  btnText: PropTypes.string.isRequired,
  children: PropTypes.node,
}
