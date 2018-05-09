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
import { ReduxEvents } from 'redux-events-middleware'
import { createSSRContext } from 'create-react-app-ssr/lib/create-ssr-context'

import { configServices } from './services'
import { configListeners } from './listeners'
import reducers from './reducers'

export const createStore = (history, initialState = {}) => {
    const events = new ReduxEvents()
    const ssrContext = createSSRContext(initialState.ssr || {})

    const enhancers = []
    const middleware = [
        thunk,
        routerMiddleware(history),
        events.createReduxMiddleware({ history }),
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
            ...ssrContext.reducers,
        }),
        {
            ...initialState,
            ssr: null,
        },
        composedEnhancers,
    )

    const isReady = new Promise(async (resolve, reject) => {
        try {
            await configListeners(events)
            await configServices(store, history)
            resolve()
        } catch (err) {
            reject(err)
        }
    })

    return {
        store,
        history,
        isReady,
        events,
        ssrContext,
    }
}
