import React from 'react'
import loadable from 'react-loadable'

import usersReducer from './reducers/users-reducer'
import usersListener from './listeners/users-listener'

/**
 * Synchronous Feature API
 * every resource listed here will partake into the main bundle
 * (reducers are required for correct SSR)
 */

export const reducers = {
    users: usersReducer,
}

export const services = []

export const listeners = [
    usersListener,
]

/**
 * Asyncronous loading for code-splitting optimization
 * all the containers that are not needed at boot time are
 * delegated to an on-demain loading
 */

export const Users = loadable({
    loader: () => import('./containers/Users'),
    loading: () => null,
})
