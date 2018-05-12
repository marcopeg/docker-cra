import { registerPosts } from 'features/posts/register'
import usersReducer from './reducers/users-reducer'
import usersListener from './listeners/users-listener'
import * as usersService from './services/users-service'

export const registerUsers = (store) => store.registerAsyncFeature({
    reducers: {
        users: usersReducer,
    },
    listeners: [
        usersListener,
    ],
    services: [
        usersService,
    ],
})

const register = (store) => {
    registerPosts(store)
    registerUsers(store)
}

export default register
