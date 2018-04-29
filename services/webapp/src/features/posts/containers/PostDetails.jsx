/* eslint react/prefer-stateless-function: off */
import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'
import { connect } from 'react-redux'

import Page from 'layouts/Page'
import PageSection from 'layouts/Page/Section'

import { loadPosts, loadPost } from '../services/posts-service'

/**
 * State Management
 */

const getPostTitle = (list, postId) => {
    const defautValue = `post n.${postId}`
    if (!list) {
        return defautValue
    }

    const post = list.find(i => String(i.id) === postId)
    if (post) {
        return post.title
    }

    return defautValue
}

const getPostContent = (posts, postId) => {
    const post = posts[postId]
    if (!post) {
        return 'loading...'
    }
    if (!post.id) {
        return 'post not found'
    }
    return post.body
}

const state2props = ({ posts }, { match }) => ({
    isReady: !!posts.details[match.params.postId],
    postId: match.params.postId,
    title: getPostTitle(posts.list, match.params.postId),
    content: getPostContent(posts.details, match.params.postId),
})

const dispatch2props = {
    loadPosts,
    loadPost,
}


/**
 * Component
 */

const Loading = () => (
    <PageSection>loading...</PageSection>
)

const Content = ({ content }) => (
    <PageSection>
        {content}
    </PageSection>
)

class PostDetails extends React.PureComponent {
    componentWillMount () {
        this.props.loadPosts()
        this.props.loadPost(this.props.postId)
    }

    render () {
        return (
            <Page title={this.props.title}>
                {(
                    this.props.isReady
                        ? <Content {...this.props} />
                        : <Loading />
                )}
            </Page>
        )
    }
}

PostDetails.propTypes = {
    postId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isReady: PropTypes.bool.isRequired,
    loadPosts: PropTypes.func.isRequired,
    loadPost: PropTypes.func.isRequired,
}

Content.propTypes = {
    content: PropTypes.string.isRequired,
}

/**
 *  Decorators & Exports
 */

const StyledPostDetails = radium(PostDetails)
export default connect(state2props, dispatch2props)(StyledPostDetails)

