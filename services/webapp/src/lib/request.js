/* eslint-disable */
/* global fetch */
const pause = require('@marcopeg/utils/lib/pause')
const { isDev } = require('@marcopeg/utils/lib/config')

// - this should be added at the app top level
// require('es6-promise').polyfill()
// require('isomorphic-fetch')

let devDelay = 0

const setDevDelay = (delay) => {
    devDelay = delay
}

// eslint-disable-next-line
const wrappedFetch = async (url, config = {}) => {
    try {
        if (isDev()) {
            await pause(devDelay)
        }
        return fetch(url, config)
    } catch (err) {
        throw err
    }
}

export const getJSON = async (url, config = {}) => {
    try {
        const headers = Object.assign({}, config.headers || {}, {
            'content-type': 'application/json',
        })
        const options = Object.assign({}, config, {
            method: 'GET',
            headers: headers,
        })
        const res = await wrappedFetch(url, options)

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

const getJSONAuth = (url, token, config = {}) => {
    const headers = Object.assign({}, config.headers || {}, {
        Authorization: `Bearer ${token}`,
    })
    const options = Object.assign({}, config, {
        headers: headers,
    })
    return getJSON(url, options)
}

const postJSON = async (url, data = {}, config = {}) => {
    try {
        const headers = Object.assign({}, config.headers || {}, {
            'content-type': 'application/json',
        })
        const options = Object.assign({}, config, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        })
        const res = await wrappedFetch(url, options)

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

const postJSONAuth = (url, token, data = {}, config = {}) => {
    const headers = Object.assign({}, config.headers || {}, {
        Authorization: `Bearer ${token}`,
    })
    const options = Object.assign({}, config, {
        headers: headers,
    })
    return postJSON(url, data, options)
}

const putJSON = async (url, data = {}, config = {}) => {
    try {
        const headers = Object.assign({}, config.headers || {}, {
            'content-type': 'application/json',
        })
        const options = Object.assign({}, config, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data),
        })
        const res = await wrappedFetch(url, options)

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

const putJSONAuth = (url, token, data = {}, config = {}) => {
    const headers = Object.assign({}, config.headers || {}, {
        Authorization: `Bearer ${token}`,
    })
    const options = Object.assign({}, config, {
        headers: headers,
    })
    return putJSON(url, data, options)
}

// export sub modules as part of the main function
// wrappedFetch.setDevDelay = setDevDelay
// wrappedFetch.getJSON = getJSON
// wrappedFetch.getJSONAuth = getJSONAuth
// wrappedFetch.postJSONAuth = postJSONAuth
// wrappedFetch.postJSONAuth = postJSONAuth
// wrappedFetch.putJSONAuth = putJSONAuth
// wrappedFetch.putJSONAuth = putJSONAuth

// module.exports = {
//     fetch: wrappedFetch,
//     setDevDelay,
//     getJSON,
//     getJSONAuth,
//     postJSON,
//     postJSONAuth,
//     putJSON,
//     putJSONAuth,
// }
