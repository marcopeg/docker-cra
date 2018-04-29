import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'

import Title from './Title'

import getStyles from './Page.style'
const styles = getStyles()

const Page = ({ children, style, title, ...props }) => (
    <div
        {...props}
        style={[ styles.wrapper, style ]}
    >
        {title ? <Title standalone>{title}</Title> : null}
        {children}
    </div>
)

Page.propTypes = {
    children: PropTypes.any.isRequired, // eslint-disable-line
    style: PropTypes.object,
    title: PropTypes.string,
}

Page.defaultProps = {
    style: {},
    title: null,
}

const StyledPage = radium(Page)

export default StyledPage
