/*
    eslint
        react/prefer-stateless-function: off,
        jsx-a11y/anchor-is-valid: off
*/

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadCurrentUser } from 'services/users-service'

import UserPosts from './UserPosts'

const state2props = ({ users }, { userId }) => ({
    id: userId,
    data: users.current !== null
        ? users.details[users.current]
        : null,
})

const dispatch2props = {
    loadCurrentUser,
}

class UserDetails extends React.Component {
    componentWillMount () {
        this.props.loadCurrentUser(this.props.id)
    }

    render () {
        if (!this.props.data) {
            return (<div>loading {this.props.id}...</div>)
        }

        return (
            <div>
                <h1>User Details</h1>
                <p>{this.props.data.name}</p>
                <code>{this.props.data.email}</code>
                <hr />
                <UserPosts userId={this.props.id} />
            </div>
        )
    }
}

UserDetails.propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }),
    loadCurrentUser: PropTypes.func.isRequired,
}

UserDetails.defaultProps = {
    data: null,
}

export default connect(state2props, dispatch2props)(UserDetails)
