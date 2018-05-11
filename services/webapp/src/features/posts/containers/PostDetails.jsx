/* eslint react/prefer-stateless-function: off */
import React from 'react'
import PropTypes from 'prop-types'
import radium from 'radium'
import connectStore from 'react-redux-feature/lib/connect-store'
import { connect } from 'react-redux'

import { Helmet } from 'react-helmet'
import Page from 'layouts/Page'
import PageSection from 'layouts/Page/Section'

import registerFeature from '../register'
import { loadPosts, loadPost } from '../services/posts-service'
import AuthorDetails from './AuthorDetails'
import RelatedPosts from './RelatedPosts'

/**
 * State Management
 */

const getPostTitle = (postsList, postId) => {
    const defautValue = `post n.${postId}`
    if (!postsList) {
        return defautValue
    }

    const post = postsList.find(i => String(i.id) === postId)
    if (post) {
        return post.title
    }

    return defautValue
}

const getPostContent = (postsMap, postId) => {
    if (!postsMap) {
        return 'loading...'
    }
    const post = postsMap[postId]
    if (!post) {
        return 'loading...'
    }
    if (!post.id) {
        return 'post not found'
    }
    return post.body
}

const getAuthorId = (postsMap, postId) => {
    if (!postsMap) {
        return null
    }
    const post = postsMap[postId]
    if (!post) {
        return null
    }
    if (!post.id) {
        return null
    }
    return String(post.userId)
}

const state2props = ({ posts }, { match }) => ({
    isReady: !!posts.details[match.params.postId],
    postId: match.params.postId,
    title: getPostTitle(posts.list, match.params.postId),
    content: getPostContent(posts.details, match.params.postId),
    authorId: getAuthorId(posts.details, match.params.postId),
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

const Content = ({ content, authorId }) => (
    <div>
        <PageSection>
            {content}
        </PageSection>
        <PageSection>
            <AuthorDetails authorId={authorId} />
        </PageSection>
        <PageSection title="Related Posts">
            <RelatedPosts authorId={authorId} />
        </PageSection>
    </div>
)

class PostDetails extends React.PureComponent {
    componentWillMount () {
        this.props.loadPosts()
        this.props.loadPost(this.props.postId)
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.postId !== nextProps.postId) {
            this.props.loadPost(nextProps.postId)
        }
    }

    render () {
        return (
            <Page title={this.props.title}>
                <Helmet><title>{this.props.title}</title></Helmet>
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
    authorId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
}

/**
 *  Decorators & Exports
 */

const StyledPostDetails = radium(PostDetails)
const ConnectedPostDetails = connect(state2props, dispatch2props)(StyledPostDetails)
export default connectStore(registerFeature)(ConnectedPostDetails)

