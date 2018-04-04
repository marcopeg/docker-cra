/* global document window */

import React from 'react'
import { hydrate } from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import { createStore } from './boot/store'
import Root from './boot/Root'
import './index.css'

const history = createHistory()
const { store, isReady } = createStore(history, window.REDUX_INITIAL_STATE || {})

isReady
    .then(() => hydrate(<Root store={store} history={history} />, document.getElementById('root')))
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
