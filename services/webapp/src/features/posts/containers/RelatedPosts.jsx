/* eslint react/prefer-stateless-function: off */
import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'
import { connect } from 'react-redux'

import List from 'components/List'
import Link from 'components/RadiumLink'

import { loadUserPosts } from 'features/users/services/users-service'

import getStyles from './Posts.style'
const styles = getStyles()

/**
 * State Management
 */

const state2props = ({ users }, { authorId }) => {
    const posts = users.posts[authorId]
    return {
        isReady: !!posts,
        posts: posts ? posts : [],
    }
}


const dispatch2props = {
    loadRelatedPosts: loadUserPosts,
}


/**
 * Component
 */

const Loading = () => null

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

const Content = ({ posts }) => (
    <List
        items={decoratePostsList(posts)}
        renderItem={PostItem}
    />
)

class RelatedPosts extends React.PureComponent {
    componentWillMount () {
        this.props.loadRelatedPosts(this.props.authorId)
    }

    render () {
        return this.props.isReady
            ? <Content {...this.props} />
            : <Loading />
    }
}

PostItem.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
}

Content.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape(PostItem.propTypes)).isRequired,
}

RelatedPosts.propTypes = {
    isReady: PropTypes.bool.isRequired,
    authorId: PropTypes.string.isRequired,
    loadRelatedPosts: PropTypes.func.isRequired,
}

/**
 *  Decorators & Exports
 */

const StyledRelatedPosts = radium(RelatedPosts)
export default connect(state2props, dispatch2props)(StyledRelatedPosts)

