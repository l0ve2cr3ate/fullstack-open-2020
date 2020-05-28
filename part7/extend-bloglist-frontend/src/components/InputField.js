import React from 'react'
import PropTypes from 'prop-types'
import styles from './InputField.module.css'

const InputField = ({ htmlFor, label, type, value, onChange, name }) => (
  <div className={styles.container}>
    {/* Add label with htmlFor for accessibility, id on input associates label with input element */}
    <label className={styles.label} htmlFor={htmlFor}>
      {label}
    </label>
    <input
      type={type}
      name={name}
      className={styles.input}
      id={htmlFor}
      value={value}
      onChange={onChange}
    />
  </div>
)

export default InputField

InputField.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
}
