import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'
import moment from 'moment'

import getStyles from './Date.style'
const styles = getStyles()

const Date = ({ value, style }) => (
    <span
        style={[ styles.wrapper, style ]}
    >
        {moment(value).format('MMMM Do YYYY, h:mm:ss a')}
    </span>
)

Date.propTypes = {
    style: PropTypes.object,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
}

Date.defaultProps = {
    style: {},
}

const StyledDate = radium(Date)

export default StyledDate
