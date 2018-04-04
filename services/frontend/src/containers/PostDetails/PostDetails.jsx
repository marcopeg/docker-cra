/*
    eslint
        jsx-a11y/anchor-is-valid: off
*/

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link, Route, Redirect } from 'react-router-dom'

import Author from 'components/Author'
import Comments from 'components/Comments'

// const state2props = ({ post, user }) => ({
//     id: post.id,
//     isLoading: post.data === null,
//     title: post.data ? post.data.title : '',
//     body: post.data ? post.data.body : '',
//     author: user.data,
//     comments: post.comments,
// })

// const Post = ({
//     id,
//     title,
//     body,
//     isLoading,
//     author,
//     comments,
//     match,
// }) => (
//     isLoading ? (
//         <div>loading post {id}</div>
//     ) : (
//         <div style={{ textAlign: 'left', margin: 20 }}>
//             <Helmet><title>{`post - ${title}`}</title></Helmet>
//             <h2>{title}</h2>
//             <div>{body}</div>
//             <hr />
//             <Link to={`/p/${id}/author`}>Author</Link>
//             {' | '}
//             <Link to={`/p/${id}/comments`}>Comments</Link>
//             <hr />
//             <Route
//                 exact
//                 path="/p/:postId/"
//                 component={() => (
//                     <Redirect to={`${match.url}/author`} />
//                 )}
//             />
//             <Route
//                 path="/p*(author)"
//                 component={() => (
//                     author
//                         ? <Author {...author} />
//                         : <span>loading...</span>
//                 )}
//             />
//             <Route
//                 path="/p*(comments)"
//                 component={() => (
//                     comments
//                         ? <Comments list={comments} />
//                         : <span>loading...</span>
//                 )}
//             />
//         </div >
//     )
// )

// Post.propTypes = {
//     id: PropTypes.string,
//     isLoading: PropTypes.bool.isRequired,
//     title: PropTypes.string.isRequired,
//     body: PropTypes.string.isRequired,
//     author: PropTypes.object, // eslint-disable-line
//     comments: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line
//     match: PropTypes.any.isRequired, // eslint-disable-line
// }

// Post.defaultProps = {
//     id: null,
//     author: null,
//     comments: null,
// }

const state2props = ({ posts, users }) => {
    const postId = posts.current
    const post = posts.details[posts.current]

    const author = post
        ? users.details[post.userId]
        : null

    const comments = post
        ? posts.comments[postId]
        : null

    return {
        postId,
        post,
        author,
        comments,
    }
}

const PostDetails = ({
    postId,
    post,
    author,
    comments,
    match,
}) => {
    if (!post) {
        return (
            <div>is loading {postId}...</div>
        )
    }

    return (
        <div style={{ textAlign: 'left', margin: 10 }}>
            <Helmet><title>{`post - ${post.title}`}</title></Helmet>
            <h2>{post.title}</h2>
            <code>{post.body}</code>
            <hr />
            <Link to={`/p/${postId}/author`}>Author</Link>
            {' | '}
            <Link to={`/p/${postId}/comments`}>Comments</Link>
            <hr />
            <Route
                exact
                path="/p/:postId/"
                component={() => (
                    <Redirect to={`${match.url}/author`} />
                )}
            />
            <Route
                path="/p*(author)"
                component={() => (
                    author
                        ? <Author {...author} />
                        : <span>loading author...</span>
                )}
            />
            <Route
                path="/p*(comments)"
                component={() => (
                    comments
                        ? <Comments list={comments} />
                        : <span>loading comments...</span>
                )}
            />
        </div>
    )
}

PostDetails.propTypes = {
    postId: PropTypes.string.isRequired,
    post: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
    }),
    author: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    }),
    comments: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        body: PropTypes.string.isRequired,
    })),
    match: PropTypes.any.isRequired, // eslint-disable-line
}

PostDetails.defaultProps = {
    post: null,
    author: null,
    comments: null,
}

export default connect(state2props)(PostDetails)
