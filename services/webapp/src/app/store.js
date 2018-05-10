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

import { decorateStore } from 'react-redux-feature/lib/decorate-store'

// import { configServices } from './services'
// import { configListeners } from './listeners'
// import reducers from './reducers'
import features from 'features'

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

    // merge initial static reducers with SSR helper
    const initialReducers = {
        // ...reducers,
        ...ssrContext.reducers,
    }

    const combinedReducers = combineReducers(initialReducers)

    const ssrInitialState = {
        ...initialState,
        ssr: null,
    }

    let store = createReduxStore(
        combinedReducers,
        ssrInitialState,
        composedEnhancers,
    )

    // react-redux-feature
    store = decorateStore({ store, history, events, initialReducers })

    const isReady = new Promise(async (resolve, reject) => {
        try {
            for (const feature of features) {
                await store.registerSyncFeature(feature)
            }
            await store.startSyncFeatures()
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
