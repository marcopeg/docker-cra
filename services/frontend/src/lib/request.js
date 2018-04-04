/* global fetch */
import { pause } from './utils'

require('es6-promise').polyfill()
require('isomorphic-fetch')

// eslint-disable-next-line
const wrappedFetch = async (url, config = null) => {
    try {
        if (process.env.NODE_ENV === 'development') {
            await pause(500)
        }
        return fetch(url, config)
    } catch (err) {
        throw err
    }
}

export const getJSON = async (url, config = null) => {
    try {
        const res = await wrappedFetch(url, config)
        return await res.json()
    } catch (err) {
        throw err
    }
}

export default wrappedFetch
