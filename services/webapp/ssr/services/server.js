const winston = require('winston')
const express = require('express')
const compression = require('compression')


const { serveBuild } = require('../middlewares/serve-build')
const { serveApp } = require('../middlewares/serve-app')
const { errorHandler } = require('../middlewares/error-handler')
const { createApiRouter } = require('../routes/v1')

const app = express()

const init = () => {
    app.use(compression())

    // serve data API
    app.use('/api/v1', createApiRouter())

    // serve client app
    app.get('/', serveApp({ timeout: 5000 }))
    app.use(serveBuild())
    app.get('*', serveApp({ timeout: 5000 }))

    // handle errors
    app.use(errorHandler)
}

const start = ({ port }) => {
    app.listen(port, () => winston.info(`[ssr] server running on ${port}`))
}

module.exports = {
    init,
    start,
}
