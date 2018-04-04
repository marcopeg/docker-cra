/*
    eslint
        import/prefer-default-export: off
*/

import React from 'react'
import { renderToString } from 'react-dom/server'
import createHistory from 'history/createMemoryHistory'
import Root from './boot/Root'
import RootStatic from './boot/RootStatic'
import { createStore } from './boot/store'

const renderInitialState = ({
    url,
    store,
    history,
    timeout,
}) => new Promise((resolve) => {
    const { ssr } = store.getState()

    const timer = setTimeout(() => {
        console.error('TIMEOUT', url) // eslint-disable-line
        resolve()
    }, timeout)

    function tick () {
        renderToString(<Root store={store} history={history} />)
        if (!ssr.checkStack()) {
            clearTimeout(timer)
            resolve()
        } else {
            ssr.once('complete', tick)
        }
    }

    history.push(url)
    renderToString(<Root store={store} history={history} />)
    ssr.once('complete', tick)
})

export const staticRender = async (url, initialState = {}, timeout) => {
    const history = createHistory()
    const { store, events } = createStore(history, initialState)
    const context = {}

    await renderInitialState({
        url,
        store,
        history,
        events,
        timeout,
    })

    const html = renderToString(<RootStatic store={store} url={url} context={context} />)

    return {
        html,
        context,
        initialState: {
            ...store.getState(),
            ssr: null,
        },
    }
}
