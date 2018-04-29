
export const reducers = {
    auth: require('./reducers/auth-reducer').default,
}

export const services = [
    require('./services/auth-service'),
]

export const listeners = [
    require('./listeners/auth-listener'),
]

export { RESET_TOKEN } from './reducers/auth-reducer'
export { removeToken } from './services/auth-service'

