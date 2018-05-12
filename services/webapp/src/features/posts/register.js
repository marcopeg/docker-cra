import { registerUsers } from 'features/users/register'
import postsReducer from './reducers/posts-reducer'

export const registerPosts = (store) => store.registerAsyncFeature({
    reducers: {
        posts: postsReducer,
    },
    listeners: [],
    services: [],
})

const register = (store) => {
    registerUsers(store)
    registerPosts(store)
}

export default register
