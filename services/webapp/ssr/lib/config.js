/**
 * App Configuration
 * =================
 *
 * Strict ENV based configuration proxy
 */

const winston = require('winston')

const init = () => {}

const get = (key, defaultValue) => {
    if (process.env[key] === undefined) {
        if (defaultValue) {
            winston.verbose(`${key}::default::${defaultValue}`)
            return defaultValue
        }

        throw new Error(`Env "${key}" not defined`)
    }
    winston.verbose(`${key}::${process.env[key]}`)
    return process.env[key]
}

const isDev = () => get('NODE_ENV') === 'development'

module.exports = {
    init,
    get,
    isDev,
}
