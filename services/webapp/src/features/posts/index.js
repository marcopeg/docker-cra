
export const reducers = {
    posts: require('./reducers/posts-reducer').default,
}

export const services = [
    require('./services/posts-service'),
]

export const listeners = []

export { default as Posts } from './containers/Posts'
export { default as PostDetails } from './containers/PostDetails'
