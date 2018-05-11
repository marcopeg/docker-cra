/*
    eslint
        react/prop-types: off
*/

import React from 'react'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'

import App from '../App'

const RootStatic = ({ store, url, context, userAgent }) => (
    <Provider store={store}>
        <StaticRouter location={url} context={context}>
            <App radiumConfig={{ userAgent }} />
        </StaticRouter>
    </Provider>
)

export default RootStatic
