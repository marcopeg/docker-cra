/*
    eslint
        react/prefer-stateless-function: off,
        jsx-a11y/anchor-is-valid: off
*/

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import radium from 'radium'

import { login } from '../services/auth-service'
import Button from 'components/Button'
import Input from 'components/Input'

import getStyles from './Login.style'

const state2props = ({ app, auth }) => ({
    ...auth,
    title: app.name,
    isActive: auth.token !== null,
})

const dispatch2props = { login }

class Login extends React.Component {
    static propTypes = {
        isActive: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        errorMsg: PropTypes.string,
        login: PropTypes.func.isRequired,
    }

    static defaultProps = {
        errorMsg: '',
    }

    onSubmit = (evt) => {
        evt.preventDefault()
        evt.stopPropagation()
        this.props.login(this.uname.value, this.passw.value)
    }

    render () {
        if (this.props.isActive) {
            return null
        }

        const styles = getStyles()
        const { errorMsg, title } = this.props
        return (
            <div style={styles.wrapper}>
                <form
                    style={styles.inner}
                    onSubmit={this.onSubmit}
                >
                    <h1 style={styles.title}>Login - {title}</h1>
                    <Input
                        key={'uname'}
                        ref={(r) => { this.uname = r }}
                        type="text"
                        placeholder="username"
                        style={styles.input}
                    />
                    <Input
                        key={'passw'}
                        ref={(r) => { this.passw = r }}
                        type="password"
                        placeholder="password"
                        style={styles.input}
                    />
                    <hr />
                    <Button
                        type="submit"
                    >
                        Log In
                    </Button>
                    {errorMsg ? <span style={styles.error}>{errorMsg}</span> : null}
                </form>
            </div>
        )
    }
}

Login.propTypes = {
    title: PropTypes.string.isRequired,
}

const StyledLogin = radium(Login)

export default connect(state2props, dispatch2props)(StyledLogin)
