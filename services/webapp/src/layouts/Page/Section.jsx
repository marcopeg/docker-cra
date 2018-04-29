import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'

import Title from './Title'

import getStyles from './Section.style'
const styles = getStyles()

const Section = ({ children, style, title, ...props }) => (
    <div style={style}>
        {title ? <Title standalone>{title}</Title> : null}
        <div
            {...props}
            style={styles.wrapper}
        >
            {children}
        </div>
    </div>
)

Section.propTypes = {
    children: PropTypes.any, // eslint-disable-line
    style: PropTypes.object,
    title: PropTypes.string,
}

Section.defaultProps = {
    children: null,
    style: {},
    title: null,
}

const StyledSection = radium(Section)

export default StyledSection
