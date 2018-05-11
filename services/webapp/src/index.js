/* global document window */

import React from 'react'
import { hydrate } from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import { createStore } from 'app/store'
import Root from 'app/Root'

// Import global stylesheet entrypoint
// any loader based stylesheet should be imported there
import 'styles'

// History & Store singleton setup in development mode
// prevents multiple store instances when accepting HMR data
// by saving store and history into the global scope
let hotHistory, hotStore
if (process.env.NODE_ENV === 'development' && !process.env.SSR && window) {
    if (!window.__patchReduxHotLoading__) {
        hotHistory = createHistory()
        hotStore = createStore(hotHistory, window.REDUX_INITIAL_STATE || {})
        window.__patchReduxHotLoading__ = { hotHistory, hotStore }
    }
    if (module.hot) {
        hotHistory = window.__patchReduxHotLoading__.hotHistory
        hotStore = window.__patchReduxHotLoading__.hotStore
    }

// production or SSR way:
// it is important that both history and store are created with
// per-request scope so to do not mess with concurrent server side rendering!
} else {
    hotHistory = createHistory()
    hotStore = createStore(hotHistory, window.REDUX_INITIAL_STATE || {})
}

export const history = hotHistory
export const { store, events, isReady } = hotStore

isReady
    .then(() => hydrate(<Root store={store} history={history} />, document.getElementById('root')))
    // .then(require('./registerServiceWorker').default)
    .catch((err) => {
        document.body.innerHTML = err ? err.message : 'unknown error'
        console.error(err) // eslint-disable-line
    })

// Basic Hot Module Reload
// this works well with dumb components but has troubles with stateful components
// https://daveceddia.com/hot-reloading-create-react-app/
if (module.hot) {
    module.hot.accept()
}

// redux dev tools (development & client only)
if (process.env.NODE_ENV === 'development' && !process.env.SSR) {
    window.store = store
}
