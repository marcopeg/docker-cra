/*
    eslint
        react/prefer-stateless-function: off,
        jsx-a11y/anchor-is-valid: off
*/

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import radium from 'radium'

import { checkLogin } from '../services/auth-service'

import Button from 'components/Button'

import getStyles from './LoginError.style'
const styles = getStyles()

const state2props = ({ auth }) => ({
    ...auth,
    isActive: (
        auth.token !== null
        && auth.errorMsg !== null
    ),
})

const dispatch2props = {
    onClick: (evt) => {
        evt.preventDefault()
        evt.stopPropagation()
        return checkLogin()
    },
}

const LoginError = ({ isActive, errorMsg, onClick }) => {
    if (!isActive) {
        return null
    }

    return (
        <div style={styles.wrapper}>
            <div
                style={styles.inner}
            >
                <div style={styles.message}>
                    {errorMsg}
                </div>
                <div>
                    <Button
                        onClick={onClick}
                    >
                        check again
                    </Button>
                </div>
            </div>
        </div>
    )
}

LoginError.propTypes = {
    isActive: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string,
    onClick: PropTypes.func.isRequired,
}

LoginError.defaultProps = {
    errorMsg: '',
}

const StyledLoginError = radium(LoginError)

export default connect(state2props, dispatch2props)(StyledLoginError)
