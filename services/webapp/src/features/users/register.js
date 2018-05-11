import usersReducer from './reducers/users-reducer'
import usersListener from './listeners/users-listener'
import * as usersService from './services/users-service'

const register = (store) => store.registerAsyncFeature({
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

export default register
