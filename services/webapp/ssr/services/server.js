const winston = require('winston')
const express = require('express')
const compression = require('compression')

// const { serveBuild } = require('../middlewares/serve-build')
const { errorHandler } = require('../middlewares/error-handler')
const { createApiRouter } = require('../routes/v1')
const { createSsrRouter } = require('../routes/ssr')

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

    // ssr - serve client app
    app.use(createSsrRouter(settings))

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
