/*
    eslint
        import/prefer-default-export: off,
        react/prop-types: off
*/

import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'

import App from './App'

const Root = ({ store, history }) => (
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>
)

export default Root
