// @flow

/**
 * App Configuration
 * =================
 *
 * Strict ENV based configuration proxy
 */

const init = () => {}

const get = (key) => {
    if (process.env[key] === undefined) {
        throw new Error(`Env "${key}" not defined`)
    }
    return process.env[key]
}

const isDev = () => get('NODE_ENV') === 'development'

module.exports = {
    init,
    get,
    isDev,
}
