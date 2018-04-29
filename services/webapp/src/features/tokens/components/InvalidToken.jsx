import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'

import Date from 'components/Date'
import ShortToken from './ShortToken'

import getStyles from './InvalidToken.style'
const styles = getStyles()

const InvalidToken = ({ token, issuedOn, error }) => (
    <div style={styles.wrapper}>
        <ShortToken value={token} />
        <div style={styles.details}>
            <div style={styles.error}>{error}</div>
            <div>released on: <Date value={issuedOn} /></div>
        </div>
    </div>
)

InvalidToken.propTypes = {
    token: PropTypes.string.isRequired,
    issuedOn: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
}

InvalidToken.defaultProps = {}

const StyledInvalidToken = radium(InvalidToken)

export default StyledInvalidToken
