/*
    eslint
        react/prefer-stateless-function: off,
        jsx-a11y/anchor-is-valid: off
*/

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { fetchUsers } from 'services/users-service'
import UserDetails from './UserDetails'

const state2props = ({ app, users }) => ({
    title: app.name,
    usersList: users.list,
})

const dispatch2props = {
    fetchUsers,
}

class Users extends React.Component {
    componentWillMount () {
        this.props.fetchUsers()
    }

    render () {
        if (!this.props.usersList) {
            return (
                <div>loading users...</div>
            )
        }

        return (
            <div style={{ textAlign: 'left', margin: 20 }}>
                <h1>Users</h1>
                <ul>
                    {this.props.usersList.map(user => (
                        <li key={user.id}>
                            <Link to={`/u/${user.id}`}>{user.name}</Link>
                        </li>
                    ))}
                </ul>
                <hr />
                <Route path="/u/:userId" component={({ match }) => <UserDetails userId={match.params.userId} />} />
            </div>
        )
    }
}

Users.propTypes = {
    // title: PropTypes.string.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    usersList: PropTypes.array, // eslint-disable-line
}

Users.defaultProps = {
    usersList: null,
}


export default connect(state2props, dispatch2props)(Users)
