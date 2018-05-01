/*
    eslint
        import/prefer-default-export: off
*/

import React from 'react'
import { renderToString } from 'react-dom/server'
import createHistory from 'history/createMemoryHistory'
import Root from 'app/containers/Root'
import RootStatic from 'app/containers/RootStatic'
import { createStore } from 'app/store'

const renderInitialState = ({
    url,
    store,
    history,
    timeout,
    userAgent,
}) => new Promise((resolve) => {
    const { ssr } = store.getState()

    const timer = setTimeout(() => {
        console.error('SSR TIMEOUT', url) // eslint-disable-line
        resolve()
    }, timeout)

    // rendering loop, used to resolve nested componentWillMount
    // data loading side effects.
    function tick () {
        renderToString(<Root store={store} history={history} userAgent={userAgent} />)
        if (!ssr.checkStack()) {
            clearTimeout(timer)
            resolve()
        } else {
            ssr.once('complete', tick)
        }
    }

    history.push(url)
    renderToString(<Root store={store} history={history} userAgent={userAgent} />)
    ssr.once('complete', tick)
})

export const staticRender = async (url, initialState = {}, settings = {}) => {
    const history = createHistory()
    const { store, events } = createStore(history, initialState)
    const context = {}
    const userAgent = settings.userAgent || 'unknown user agent'

    await renderInitialState({
        url,
        store,
        history,
        events,
        timeout: settings.timeout || 3000,
        userAgent,
    })

    const html = renderToString(<RootStatic store={store} url={url} context={context} userAgent={userAgent} />)

    return {
        html,
        context,
        initialState: {
            ...store.getState(),
            ssr: null,
        },
    }
}
