import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'

import Date from 'components/Date'
import ShortToken from './ShortToken'

import getStyles from './ValidToken.style'
const styles = getStyles()

const ValidToken = ({ token, issuedOn, expiresIn, payload, exp }) => (
    <div style={styles.wrapper}>
        <ShortToken value={token} fullSize />
        <div style={styles.details}>
            <div>grants: {JSON.stringify(payload.grant)}</div>
            <div>on behalf of: {payload.uname} <small>({payload.version})</small></div>
            <div>released on: <Date value={issuedOn} /></div>
            <div>expires on: <Date value={exp * 1000} /> <small>({expiresIn})</small></div>
        </div>
    </div>
)

ValidToken.propTypes = {
    token: PropTypes.string.isRequired,
    issuedOn: PropTypes.string.isRequired,
    expiresIn: PropTypes.string.isRequired,
    payload: PropTypes.shape({
        grant: PropTypes.arrayOf(PropTypes.string).isRequired,
        uname: PropTypes.string.isRequired,
        version: PropTypes.string.isRequired,
    }).isRequired,
    exp: PropTypes.number.isRequired,
}

ValidToken.defaultProps = {}

const StyledValidToken = radium(ValidToken)

export default StyledValidToken
