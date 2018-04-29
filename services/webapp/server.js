// const Sequelize = require('sequelize')
// const elasticsearch = require('elasticsearch')

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
// const jwt = require('./ssr/services/jwt')
// const jsondb = require('./ssr/services/jsondb')
// const pg = require('./ssr/services/postgres')
// const els = require('./ssr/services/elasticsearch')

const boot = async () => {
    try {
        // init services
        winston.verbose('[boot] init services...')
        await env.init()
        // await jwt.init({
        //     secret: '12345',
        // })
        // await jsondb.init()
        // await pg.init(Sequelize, 'crawler', {
        //     host: String(getConfig('CRAWLER_PG_HOST')),
        //     port: Number(getConfig('CRAWLER_PG_PORT')),
        //     database: String(getConfig('CRAWLER_PG_DB')),
        //     username: String(getConfig('CRAWLER_PG_USER')),
        //     password: String(getConfig('CRAWLER_PG_PASSWORD')),
        //     activityLogger: winston.debug,
        //     queryLogger: winston.level === getConfig('CRAWLER_PG_DEBUG')
        //         ? console.log // eslint-disable-line
        //         : null,
        //     pool: {
        //         max: 3,
        //         min: 0,
        //         acquire: 30000,
        //         idle: 10000,
        //     },
        // })
        // await els.init(elasticsearch, {
        //     clusters: {
        //         crawler: {
        //             hosts: [
        //                 String(getConfig('CRAWLER_ELS_ENDPOINT')),
        //             ],
        //         },
        //     },
        // })
        await server.init()

        // start services
        winston.verbose('[boot] start services...')
        // await jsondb.start()
        // await pg.start('crawler', {
        //     maxAttempts: Number(getConfig('CRAWLER_PG_MAX_CONN_ATTEMPTS')),
        //     attemptDelay: Number(getConfig('CRAWLER_PG_CONN_ATTEMPTS_DELAY')),
        //     models: [],
        // })
        // await els.start('crawler')
        await server.start()

        winston.verbose('[boot] complete!')
    } catch (err) {
        winston.error('===== BOOT ERROR ======')
        winston.error(err.message)
        winston.debug(err)
    }
}

boot()
