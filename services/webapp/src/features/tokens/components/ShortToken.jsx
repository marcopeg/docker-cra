import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'
import { truncate, cancelClick } from 'lib/utils'

import getStyles from './ShortToken.style'
const styles = getStyles()

const ShortToken = ({ value, fullSize, maxLength }) => (
    <div style={styles.wrapper} onClick={cancelClick}>
        {fullSize ? value : truncate(value, maxLength)}
    </div>
)

ShortToken.propTypes = {
    value: PropTypes.string.isRequired,
    fullSize: PropTypes.bool,
    maxLength: PropTypes.number,
}

ShortToken.defaultProps = {
    fullSize: false,
    maxLength: 50,
}

const StyledShortToken = radium(ShortToken)

export default StyledShortToken
