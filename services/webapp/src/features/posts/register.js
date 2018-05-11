import postsReducer from './reducers/posts-reducer'

const register = (store) => store.registerAsyncFeature({
    reducers: {
        posts: postsReducer,
    },
    listeners: [],
    services: [],
})

export default register
