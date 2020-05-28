import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ type, className, children, onClick, dataCy }) => (
  <button data-cy={dataCy} className={className} type={type} onClick={onClick}>
    {children}
  </button>
)

export default Button

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
}
