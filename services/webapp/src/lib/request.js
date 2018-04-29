/* global fetch */
import { pause } from './utils'

require('es6-promise').polyfill()
require('isomorphic-fetch')

// eslint-disable-next-line
const wrappedFetch = async (url, config = {}) => {
    try {
        if (process.env.NODE_ENV === 'development') {
            await pause(0)
        }
        return fetch(url, config)
    } catch (err) {
        throw err
    }
}

export const getJSON = async (url, config = {}) => {
    try {
        const headers = config.headers || {}
        const res = await wrappedFetch(url, {
            ...config,
            method: 'GET',
            headers: {
                ...headers,
                'content-type': 'application/json',
            },
        })

        // status code error handling
        if (res.status !== 200) {
            let errMsg
            try {
                errMsg = await res.text()
            } catch (err) {
                errMsg = res.statusText
            }

            const error = new Error(`${res.status} - ${errMsg}`)
            error.response = res
            throw error
        }

        return await res.json()
    } catch (err) {
        throw err
    }
}

export const getJSONAuth = (url, token, config = {}) => {
    const headers = config.headers || {}
    return getJSON(url, {
        ...config,
        headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
        },
    })
}

export const postJSON = async (url, data = {}, config = {}) => {
    try {
        const headers = config.headers || {}
        const res = await wrappedFetch(url, {
            ...config,
            method: 'POST',
            headers: {
                ...headers,
                'content-type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        // status code error handling
        if (res.status !== 200) {
            let errMsg
            try {
                errMsg = await res.text()
            } catch (err) {
                errMsg = res.statusText
            }

            const error = new Error(`${res.status} - ${errMsg}`)
            error.response = res
            throw error
        }

        return await res.json()
    } catch (err) {
        throw err
    }
}

export const postJSONAuth = (url, token, data = {}, config = {}) => {
    const headers = config.headers || {}
    return postJSON(url, data, {
        ...config,
        headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
        },
    })
}

export const putJSON = async (url, data = {}, config = {}) => {
    try {
        const headers = config.headers || {}
        const res = await wrappedFetch(url, {
            ...config,
            method: 'PUT',
            headers: {
                ...headers,
                'content-type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        // status code error handling
        if (res.status !== 200) {
            let errMsg
            try {
                errMsg = await res.text()
            } catch (err) {
                errMsg = res.statusText
            }

            const error = new Error(`${res.status} - ${errMsg}`)
            error.response = res
            throw error
        }

        return await res.json()
    } catch (err) {
        throw err
    }
}

export const putJSONAuth = (url, token, data = {}, config = {}) => {
    const headers = config.headers || {}
    return putJSON(url, data, {
        ...config,
        headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
        },
    })
}

export default wrappedFetch
