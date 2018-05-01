// const Sequelize = require('sequelize')
// const elasticsearch = require('elasticsearch')

// Setup winston log level
const winston = require('winston')
winston.level = process.env.LOG_LEVEL || 'verbose'

winston.verbose('[boot] warming up...')

// ES6 Compatibility (for client-side code)
require('ignore-styles')
require('babel-register')({
    ignore: /\/(build|node_modules)\//,
    presets: [ 'env', 'react-app' ],
    plugins: [
        [ 'module-resolver', { root: ['./src'] } ],
    ],
})
// <--> ES6 Compatibility (for client-side code)

// Isomorphic Fetch
require('es6-promise').polyfill()
require('isomorphic-fetch')
// <--> Isomorphic Fetch

const { get: getConfig } = require('./ssr/lib/config')

// Include Services
const env = require('./ssr/services/env')
const server = require('./ssr/services/server')

const boot = async () => {
    try {
        // init services
        winston.verbose('[boot] init services...')
        await env.init()
        await server.init()

        // start services
        winston.verbose('[boot] start services...')
        await server.start({
            port: getConfig('SSR_PORT', 8080),
        })

        winston.verbose('[boot] complete!')
    } catch (err) {
        winston.error('===== BOOT ERROR ======')
        winston.error(err.message)
        winston.debug(err)
    }
}

boot()
