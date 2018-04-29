
export const reducers = {
    tokens: require('./reducers/tokens-reducer').default,
}

export const services = [
    require('./services/tokens-service'),
]

export const listeners = [
    require('./listeners/tokens-listener'),
]
