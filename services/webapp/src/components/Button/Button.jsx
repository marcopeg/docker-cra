import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'

import getStyles from './Button.style'

const styles = getStyles()

const Button = ({ children, onClick, style, type, variant, ...props }) => (
    <button
        {...props}
        type={type}
        style={[ styles.wrapper, styles.wrapper[variant], style ]}
        onClick={onClick}
    >
        {children}
    </button>
)

Button.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.any.isRequired, // eslint-disable-line
    style: PropTypes.object,
    type: PropTypes.string,
    variant: PropTypes.string,
}

Button.defaultProps = {
    style: {},
    type: 'button',
    variant: 'button',
    onClick: null,
}

const StyledButton = radium(Button)

export default StyledButton
