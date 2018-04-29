/* eslint react/prefer-stateless-function: off */

import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'
import { connect } from 'react-redux'

import { withModal } from 'features/modals'
import Page from 'layouts/Page'
import PageSection from 'layouts/Page/Section'

import Input from 'components/Input'
import Button from 'components/Button'

import { changeUserPassw } from '../services/users-service'

// import getStyles from './ChangePassword.style'
// const styles = getStyles()

const mapState = ({ modals }) => ({
    uname: modals.chpwd ? modals.chpwd.uname : '',
})

const mapDispatch = {
    changeUserPassw,
}

class ChangePassword extends React.Component {
    static propTypes = {
        uname: PropTypes.string.isRequired,
        changeUserPassw: PropTypes.func.isRequired,
    }

    onSubmit = (evt) => {
        evt.preventDefault()
        evt.stopPropagation()

        const { uname, changeUserPassw } = this.props
        const oldPassw = evt.target.elements.passw_old.value
        const newPassw = evt.target.elements.passw_new.value

        changeUserPassw(uname, oldPassw, newPassw)
    }

    render () {
        const { uname } = this.props
        return (
            <Page title={`Change Password: ${uname}`}>
                <PageSection>
                    <form onSubmit={this.onSubmit}>
                        <div>
                            <Input
                                type="password"
                                name="passw_old"
                                placeholder="old password"
                            />
                        </div>
                        <div>
                            <Input
                                type="password"
                                name="passw_new"
                                placeholder="new password password"
                            />
                        </div>
                        <div>
                            <Button
                                type="submit"
                            >Change Password</Button>
                        </div>
                    </form>
                </PageSection>
            </Page>
        )
    }
}

export default withModal(connect(mapState, mapDispatch)(radium(ChangePassword)), {
    id: 'chpwd',
    dismissable: true,
})

