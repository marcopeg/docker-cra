import React from 'react'
import loadable from 'react-loadable'

export const reducers = {
    posts: require('./reducers/posts-reducer').default,
}

export const services = [
    /**
     * Syncronous loading, single bundle optimization
     * (comment out if using code-splitting)
     */
    // require('./services/posts-service'),
]

export const listeners = []

/**
 * Syncronous loading, single bundle optimization
 * (comment out if using code-splitting)
 */
// export { default as Posts } from './containers/Posts'
// export { default as PostDetails } from './containers/PostDetails'

/**
 * Asyncronous loading for code-splitting optimization
 * all the containers that are not needed at boot time are
 * delegated to an on-demain loading
 */
export const Posts = loadable({
    loader: () => import('./containers/Posts'),
    loading () {
        return <div>loading</div>
    },
})

export const PostDetails = loadable({
    loader: () => import('./containers/PostDetails'),
    loading () {
        return <div>loading</div>
    },
})
