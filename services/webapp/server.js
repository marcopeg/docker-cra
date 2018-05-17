const path = require('path')
// const Sequelize = require('sequelize')
// const elasticsearch = require('elasticsearch')

// Setup winston log level
const winston = require('winston')
winston.level = process.env.LOG_LEVEL || 'verbose'

winston.verbose('[boot] warming up...')

// SSR - ES6 Compatibility (for client-side code)
// (this is needed only for **SSR_ENABLED=yes**)
// (you can comment it out if not using SSR for better memory footprint)
require('babel-register')({
    ignore: /\/(build|node_modules)\//,
    presets: [
        [ 'env', {'targets': { 'node': 'current', 'browsers': [ 'last 2 versions', 'safari >= 7' ] }}], // eslint-disable-line
        'react-app',
    ],
    plugins: [
        [ 'module-resolver', { root: ['./src'] } ],
        'syntax-dynamic-import',
        'dynamic-import-node',
        'react-loadable/babel',
    ],
})
// <--> ES6 Compatibility (for client-side code)

// SSR - Handle Images
require('create-react-app-ssr/lib/create-ignore-styles').createIgnoreStyles()

// SSR - Isomorphic Fetch
require('es6-promise').polyfill()
require('isomorphic-fetch')
// <--> Isomorphic Fetch

const { get: getConfig } = require('@marcopeg/utils/lib/config')

// Include Services
const env = require('./ssr/services/env')
const server = require('./ssr/services/server')

// Env Defaults
const defaultEnv = {
    ssrEnabled: 'yes',
    ssrTimeout: 5000,
    ssrRoot: path.join(__dirname, 'src'),
    ssrBuild: path.join(__dirname, 'build'),
    ssrPort: 8080,
    ssrDisableJs: 'no',
    ssrUseWebpackJs: 'no',
    ssrBlacklist: [],
}

// Boot the app
const boot = async () => {
    try {
        // init services
        winston.verbose('[boot] init services...')
        await env.init()
        await server.init({
            ssrEnabled: getConfig('SSR_ENABLED', defaultEnv.ssrEnabled),
            ssrTimeout: getConfig('SSR_TIMEOUT', defaultEnv.ssrTimeout),
            ssrRoot: getConfig('SSR_ROOT', defaultEnv.ssrRoot),
            ssrBuild: getConfig('SSR_BUILD', defaultEnv.ssrBuild),
            ssrPort: getConfig('SSR_PORT', defaultEnv.ssrPort),
            ssrDisableJs: getConfig('SSR_DISABLE_JS', defaultEnv.ssrDisableJs),
            ssrUseWebpackJs: getConfig('SSR_USE_WEBPACK_JS', defaultEnv.ssrUseWebpackJs),
            ssrBlacklist: getConfig('SSR_BLACKLIST', defaultEnv.ssrBlacklist),
            nodeEnv: getConfig('NODE_ENV'),
        })

        const Loadable = require('react-loadable') // eslint-disable-line
        await Loadable.preloadAll()

        // start services
        winston.verbose('[boot] start services...')
        await server.start({
            port: getConfig('SSR_PORT', defaultEnv.ssrPort),
        })

        winston.verbose('[boot] complete!')
    } catch (err) {
        winston.error('===== BOOT ERROR ======')
        winston.error(err.message)
        winston.debug(err)
        console.log(err)
    }
}

boot()

// Almost gracefully exit
process.on('SIGTERM', function () {
    process.exit(0)
})
