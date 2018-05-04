const winston = require('winston')
const express = require('express')
const compression = require('compression')

const { serveBuild } = require('../middlewares/serve-build')
const { errorHandler } = require('../middlewares/error-handler')
const { createApiRouter } = require('../routes/v1')

const app = express()

/**
 * Settings:
 * ssrEnabled: (string)[yes|no]
 * ssrTimeout: (int) - rendering timeout in milliseconds
 */
const init = (settings = {}) => {
    app.use(compression())

    // serve data API
    app.use('/api/v1', createApiRouter())

    // serve client app
    let serveApp = null
    if (settings.ssrEnabled === 'yes') {
        const { serveAppSSR } = require('../middlewares/serve-app-ssr')
        serveApp = serveAppSSR
    } else {
        const { serveAppStatic } = require('../middlewares/serve-app-static')
        serveApp = serveAppStatic
    }

    app.get('/', serveApp(settings))
    app.use(serveBuild(settings))
    app.get('*', serveApp(settings))

    // handle errors
    app.use(errorHandler)
}

/**
 * Settings
 * -  port: (string) - server port
 */
const start = ({ port }) => {
    app.listen(port, () => winston.info(`[ssr] server running on ${port}`))
}

module.exports = {
    init,
    start,
}
