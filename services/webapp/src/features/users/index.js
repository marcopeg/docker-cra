import React from 'react'
import loadable from 'react-loadable'

export const reducers = {
    users: require('./reducers/users-reducer').default,
}

export const services = [
    require('./services/users-service'),
]

export const listeners = [
    require('./listeners/users-listener'),
]

// export { default as Users } from './containers/Users'

export const Users = loadable({
    loader: () => import('./containers/Users'),
    loading () {
        return <div>loading</div>
    },
})
