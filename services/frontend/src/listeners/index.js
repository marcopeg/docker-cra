/* eslint global-require: off */
// import { registerListener } from '../lib/redux-events-middleware'

const listeners = [
    require('./location-listener'),
]

// eslint-disable-next-line
export const configListeners = (events) =>
    listeners
        .map(listener => listener.default)
        .map(listener => events.registerListener(listener))
