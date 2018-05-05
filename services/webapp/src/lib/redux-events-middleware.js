/*
    eslint
        import/prefer-default-export: off
*/

// const EventEmitter = require('events');

import logger from '@marcopeg/utils/lib/logger'

export class ReduxEvents {
    constructor () {
        this.listeners = []
    }

    registerListener (listener) {
        this.listeners = [
            ...this.listeners,
            ...listener,
        ]
    }

    createReduxMiddleware (ctx) {
        return store => next => (action) => {
            // console.log(`EVENT: ${action.type}`)
            // console.log(listeners)
            this.listeners
                .filter(listener => listener.type === action.type)
                .forEach((listener) => {
                    try {
                        if (listener.async) {
                            setTimeout(() => listener.handler(action)(store.dispatch, store.getState))
                        } else {
                            listener.handler(action, ctx)(store.dispatch, store.getState)
                        }
                    } catch (e) {
                        logger.error('Redux event handler error')
                    }
                })

            return next(action)
        }
    }
}
