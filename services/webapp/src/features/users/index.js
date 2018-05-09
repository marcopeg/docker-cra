import React from 'react'
import loadable from 'react-loadable'

export const reducers = {
    users: require('./reducers/users-reducer').default,
}

export const services = [
    /**
     * Syncronous loading, single bundle optimization
     * (comment out if using code-splitting)
     */
    // require('./services/users-service'),
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
