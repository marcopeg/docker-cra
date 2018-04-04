
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadUserPosts } from 'services/users-service'
import { Link } from 'react-router-dom'

const state2props = ({ users }, { userId }) => ({
    userId,
    items: users.posts[userId]
        ? users.posts[userId]
        : null,
})

const dispatch2props = {
    loadUserPosts,
}

class UserPosts extends React.Component {
    componentWillMount () {
        this.props.loadUserPosts(this.props.userId)
    }

    render () {
        if (!this.props.items) {
            return (<div>loading user posts...</div>)
        }

        return (
            <div>
                <h1>User Posts</h1>
                {this.props.items.map(post => (
                    <li key={post.id}>
                        <Link to={`/p/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </div>
        )
    }
}

UserPosts.propTypes = {
    userId: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
    })),
    loadUserPosts: PropTypes.func.isRequired,
}

UserPosts.defaultProps = {
    items: null,
}

export default connect(state2props, dispatch2props)(UserPosts)
