
// ES6 Compatibility (for client-side code)
require('ignore-styles')
require('babel-register')({
    ignore: /\/(build|node_modules)\//,
    presets: [ 'env', 'react-app' ],
    plugins: [
        [ 'module-resolver', { root: ['./src'] } ],
    ],
})

// Isomorphic Fetch
require('es6-promise').polyfill()
require('isomorphic-fetch')

// Setup Logging
const winston = require('winston')
winston.level = process.env.LOG_LEVEL || 'verbose'

// Include Services
const env = require('./ssr/services/env')
const server = require('./ssr/services/server')

const boot = async () => {
    try {
        await env.init()
        await server.init()
        await server.start()
    } catch (err) {
        winston.error('===== BOOT ERROR ======')
        winston.error(err.message)
        winston.debug(err)
    }
}

boot()
