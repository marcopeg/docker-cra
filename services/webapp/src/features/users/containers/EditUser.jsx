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

import { openModal } from 'features/modals'
import { updateUser, deleteUser } from '../services/users-service'

const mapState = ({ modals, users }) => ({
    uname: modals.editusr ? modals.editusr.uname : '',
    data: users.active,
})

const mapDispatch = {
    changePassword: uname => openModal('chpwd', { uname }),
    updateUser,
    deleteUser,
}

class EditUser extends React.Component {
    static propTypes = {
        uname: PropTypes.string.isRequired,
        data: PropTypes.shape({
            grant: PropTypes.arrayOf(PropTypes.string).isRequired,
        }),
        updateUser: PropTypes.func.isRequired,
        deleteUser: PropTypes.func.isRequired,
        changePassword: PropTypes.func.isRequired,
    }

    static defaultProps = {
        data: null,
    }

    onSubmit = (evt) => {
        evt.preventDefault()
        evt.stopPropagation()

        const { uname } = this.props
        const grant = evt.target.elements.grant.value

        this.props.updateUser(uname, { grant })
    }

    render () {
        const { uname, data, changePassword, deleteUser } = this.props

        if (!data) {
            return <div>loading...</div>
        }

        return (
            <Page title={`Edit User :: ${uname}`}>
                <form onSubmit={this.onSubmit}>
                    <PageSection>
                        <div>
                            <Input
                                type="text"
                                name="grant"
                                placeholder="grant permissions"
                                initialValue={JSON.stringify(data.grant)}
                            />
                        </div>
                    </PageSection>
                    <PageSection>
                        <Button type="submit">Update User</Button>
                        {' '}
                        <Button
                            variant="link"
                            onClick={() => changePassword(uname)}
                        >Change Password</Button>
                        {' '}
                        <Button
                            variant="link"
                            onClick={() => deleteUser(uname)}
                        >Delete User</Button>
                    </PageSection>
                </form>
            </Page>
        )
    }
}

export default withModal(connect(mapState, mapDispatch)(radium(EditUser)), {
    id: 'editusr',
    dismissable: true,
})

