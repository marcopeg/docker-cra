/*
    eslint
        import/prefer-default-export: off
*//* global window */

import {
    createStore as createReduxStore,
    applyMiddleware,
    compose,
    combineReducers,
} from 'redux'
import thunk from 'redux-thunk'

import { routerMiddleware } from 'react-router-redux'

import { ReduxEvents } from 'lib/redux-events-middleware'
import createSSRContext from 'lib/ssr'

import { configServices } from '../services'
import { configListeners } from '../listeners'
import reducers from '../reducers'

export const createStore = (history, initialState = {}) => {
    const events = new ReduxEvents()
    const ssr = createSSRContext()

    const enhancers = []
    const middleware = [
        thunk,
        routerMiddleware(history),
        events.createReduxMiddleware(),
    ]

    // redux dev tools (development & client only)
    if (process.env.NODE_ENV === 'development' && !process.env.SSR) {
        const { devToolsExtension } = window

        if (typeof devToolsExtension === 'function') {
            enhancers.push(devToolsExtension())
        }
    }

    const composedEnhancers = compose(
        applyMiddleware(...middleware),
        ...enhancers,
    )

    const store = createReduxStore(
        combineReducers({
            ...reducers,
            ...ssr.reducers,
        }),
        initialState,
        composedEnhancers,
    )

    const isReady = new Promise(async (resolve, reject) => {
        try {
            await configListeners(events)
            await configServices(store, history)
            resolve()
        } catch (err) {
            reject()
        }
    })

    return {
        store,
        history,
        isReady,
        events,
        ssr,
    }
}
