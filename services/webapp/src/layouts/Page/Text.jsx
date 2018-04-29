import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'

import getStyles from './Text.style'
const styles = getStyles()

const Text = ({ children, style, ...props }) => (
    <span
        {...props}
        style={[ styles.wrapper, style ]}
    >
        {children}
    </span>
)

Text.propTypes = {
    children: PropTypes.any.isRequired, // eslint-disable-line
    style: PropTypes.object,
}

Text.defaultProps = {
    style: {},
}

const StyledText = radium(Text)

export default StyledText
