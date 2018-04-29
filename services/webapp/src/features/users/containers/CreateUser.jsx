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

import { createUser } from '../services/users-service'

const mapState = ({ modals }) => ({
    uname: modals.chpwd ? modals.chpwd.uname : '',
})

const mapDispatch = {
    createUser,
}

class CreateUser extends React.Component {
    static propTypes = {
        createUser: PropTypes.func.isRequired,
    }

    onSubmit = (evt) => {
        evt.preventDefault()
        evt.stopPropagation()

        const uname = evt.target.elements.uname.value
        const passw = evt.target.elements.passw.value
        const grant = evt.target.elements.grant.value

        this.props.createUser(uname, passw, grant)
    }

    render () {
        return (
            <Page title="Create New User">
                <form onSubmit={this.onSubmit}>
                    <PageSection>
                        <div>
                            <Input
                                type="text"
                                name="uname"
                                placeholder="pick a username"
                            />
                        </div>
                        <div>
                            <Input
                                type="password"
                                name="passw"
                                placeholder="user password"
                            />
                        </div>
                        <div>
                            <Input
                                type="text"
                                name="grant"
                                placeholder="grant permissions"
                            />
                        </div>
                    </PageSection>
                    <PageSection>
                        <div>
                            <Button
                                type="submit"
                            >Create User</Button>
                        </div>
                    </PageSection>
                </form>
            </Page>
        )
    }
}

export default withModal(connect(mapState, mapDispatch)(radium(CreateUser)), {
    id: 'newusr',
    dismissable: true,
})

