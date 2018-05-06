const express = require('express')

const { createApiRouter } = require('./v1')
const { createSsrRouter } = require('./ssr')

const createAppRouter = (settings) => {
    const router = express.Router()

    // serve data API
    router.use('/api/v1', createApiRouter())

    // ssr - serve client app
    router.use(createSsrRouter(settings))

    return router
}

module.exports = {
    createAppRouter,
}
