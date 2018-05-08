import React from 'react'
import loadable from 'react-loadable'

export const reducers = {
    posts: require('./reducers/posts-reducer').default,
}

export const services = [
    require('./services/posts-service'),
]

export const listeners = []

// export { default as Posts } from './containers/Posts'
// export { default as PostDetails } from './containers/PostDetails'

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
