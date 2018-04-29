import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'

import getStyles from './Title.style'
const styles = getStyles()

const Title = ({ children, standalone, style, ...props }) => (
    <div
        {...props}
        style={[
            styles.wrapper,
            standalone ? styles.wrapper.standalone : null,
            style,
        ]}
    >
        {children}
    </div>
)

Title.propTypes = {
    children: PropTypes.any.isRequired, // eslint-disable-line
    style: PropTypes.object,
    standalone: PropTypes.bool,
}

Title.defaultProps = {
    style: {},
    standalone: false,
}

const StyledTitle = radium(Title)

export default StyledTitle
