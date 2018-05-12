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
import {
    getReducers as getFeaturesReducers,
    decorateStore as decorateStoreWithFeatures,
} from 'react-redux-feature/lib/decorate-store'

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
    // if (process.env.NODE_ENV === 'development' && !process.env.SSR) {
    if (!process.env.SSR) { // heavy development mode
        const { devToolsExtension } = window

        if (typeof devToolsExtension === 'function') {
            enhancers.push(devToolsExtension())
        }
    }

    const composedEnhancers = compose(
        applyMiddleware(...middleware),
        ...enhancers,
    )

    // merge feature's static reducers with SSR helper
    const initialReducers = {
        ...getFeaturesReducers(features),
        ...ssrContext.reducers,
    }

    const combinedReducers = combineReducers(initialReducers)

    // SSR - replace the ssr helper so that can be initialize
    // SSR - on the client with the proper functionalities
    const ssrInitialState = {
        ...initialState,
        ssr: null,
    }

    let store = createReduxStore(
        combinedReducers,
        ssrInitialState,
        composedEnhancers,
    )

    // react-redux-deatures
    // add features capabilities to the store
    store = decorateStoreWithFeatures({ store, history, events, initialReducers })

    // Initialize dynamic stuff
    // (client side only)
    const isReady = new Promise(async (resolve, reject) => {
        try {
            // react-redux-deatures
            // start registered features services
            await store.registerSyncFeatures(features)
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
