/*
    eslint
        jsx-a11y/anchor-is-valid: off
*/

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const state2props = ({ posts }) => ({
    items: posts.list,
})

const Posts = ({ items }) => {
    if (!items) {
        return (
            <div>loading...</div>
        )
    }

    return (
        <ul style={{ textAlign: 'left' }}>
            {items.map(post => (
                <li key={post.id}>
                    <Link to={`/p/${post.id}`}>{post.title}</Link>
                </li>
            ))}
        </ul>
    )
}

Posts.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
    })),
}

Posts.defaultProps = {
    items: null,
}

export default connect(state2props)(Posts)
