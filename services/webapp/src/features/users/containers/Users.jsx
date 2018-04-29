import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'
import { connect } from 'react-redux'
import { openModal } from 'features/modals'

import Page from 'layouts/Page'
import PageSection from 'layouts/Page/Section'
import List from 'components/List'
import Button from 'components/Button'
import ChangePassword from './ChangePassword'
import EditUser from './EditUser'
import CreateUser from './CreateUser'

import { loadUser } from '../services/users-service'

const state2props = ({ users, modals }) => ({
    list: users.list || [],
})

const dispatch2props = {
    editUser: uname => (dispatch) => {
        dispatch(loadUser(uname))
        dispatch(openModal('editusr', { uname }))
    },
    createUser: uname => openModal('newusr'),
}

const makeListItems = items => items.map(item => ({
    key: item,
    uname: item,
}))

const renderUser = user => user.uname

const Users = ({ list, editUser, createUser }) => (
    <Page title="Users">
        <PageSection>
            <List
                items={makeListItems(list)}
                renderItem={renderUser}
                onDisclose={item => editUser(item.uname)}
            />
        </PageSection>
        <PageSection>
            <Button onClick={createUser}>Add new user</Button>
        </PageSection>

        {/* modals */}
        <CreateUser />
        <EditUser />
        <ChangePassword />
    </Page>
)

Users.propTypes = {
    list: PropTypes.arrayOf(PropTypes.string),
    editUser: PropTypes.func.isRequired,
    createUser: PropTypes.func.isRequired,
}

Users.defaultProps = {
    list: null,
}

const StyledUsers = radium(Users)

export default connect(state2props, dispatch2props)(StyledUsers)
