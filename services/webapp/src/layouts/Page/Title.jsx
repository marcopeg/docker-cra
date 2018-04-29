import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'

import getStyles from './Title.style'
const styles = getStyles()

const Title = ({ children, style, ...props }) => (
    <div
        {...props}
        style={[ styles.wrapper, style ]}
    >
        {children}
    </div>
)

Title.propTypes = {
    children: PropTypes.any.isRequired, // eslint-disable-line
    style: PropTypes.object,
}

Title.defaultProps = {
    style: {},
}

const StyledTitle = radium(Title)

export default StyledTitle
