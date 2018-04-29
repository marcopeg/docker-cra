import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import radium from 'radium'

import PageSection from 'layouts/Page/Section'
import List from 'components/List'
import Link from 'components/RadiumLink'

import getStyles from './Users.style'
const styles = getStyles()

/**
 * State Management
 */

const state2props = ({ users }, { match }) => {
    const posts = users.posts[match.params.userId]
    return {
        isReady: !!posts,
        posts: posts ? posts : [],
    }
}

const dispatch2props = {}


/**
 * Component
 */

const Loading = () => (
    <span>loading...</span>
)

const decoratePostsList = posts =>
    posts.map(post => ({
        ...post,
        key: post.id,
    }))

const PostItem = ({ id, title }) => (
    <Link
        to={`/posts/${id}`}
        style={styles.link}
        children={title}
    />
)

const Posts = ({ posts }) => (
    <List
        items={decoratePostsList(posts)}
        renderItem={PostItem}
    />
)

const UserPosts = ({ isReady, ...props }) => (
    <PageSection
        children={(
            isReady
                ? <Posts {...props} />
                : <Loading />
        )}
    />
)

UserPosts.propTypes = {
    isReady: PropTypes.bool.isRequired,
}

PostItem.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
}

Posts.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape(PostItem.propTypes)).isRequired,
}


/**
 *  Decorators & Exports
 */

const StyledUserPosts = radium(UserPosts)
export default connect(state2props, dispatch2props)(StyledUserPosts)
