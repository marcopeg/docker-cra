/*
    eslint
        react/prop-types: off
*/

import React from 'react'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'

import App from '../containers/App'

const RootStatic = ({ store, url, context }) => (
    <Provider store={store}>
        <StaticRouter location={url} context={context}>
            <App />
        </StaticRouter>
    </Provider>
)

export default RootStatic
