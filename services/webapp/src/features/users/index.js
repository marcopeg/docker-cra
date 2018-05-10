import React from 'react'
import loadable from 'react-loadable'

import usersReducer from './reducers/users-reducer'
// import usersListener from './listeners/users-listener'

export const reducers = {
    users: usersReducer,
}

export const services = [
    /**
     * Syncronous loading, single bundle optimization
     * (comment out if using code-splitting)
     */
    require('./services/users-service'),
]

export const listeners = [
    require('./listeners/users-listener'),
]

/**
 * Syncronous loading, single bundle optimization
 * (comment out if using code-splitting)
 */
// export { default as Users } from './containers/Users'

/**
 * Asyncronous loading for code-splitting optimization
 * all the containers that are not needed at boot time are
 * delegated to an on-demain loading
 */
export const Users = loadable({
    loader: () => import('./containers/Users'),
    loading () {
        return <div>loading</div>
    },
})
