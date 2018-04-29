const winston = require('winston')
const express = require('express')
const compression = require('compression')


const { serveBuild } = require('../middlewares/serve-build')
const { serveApp } = require('../middlewares/serve-app')
const { errorHandler } = require('../middlewares/error-handler')
const { router: apiV1 } = require('../routes/v1')

const PORT = process.env.PORT || 8080
const app = express()

const init = () => {
    app.use(compression())

    // serve data API
    app.use('/api/v1', apiV1)

    // serve client app
    app.get('/', serveApp())
    app.use(serveBuild())
    app.get('*', serveApp())

    // handle errors
    app.use(errorHandler)
}

const start = () => {
    app.listen(PORT, () => winston.info(`[ssr] server running on ${PORT}`))
}

module.exports = {
    init,
    start,
}
