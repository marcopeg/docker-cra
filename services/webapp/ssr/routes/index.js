const express = require('express')
const { createSSRRouter } = require('create-react-app-ssr')
const { createApiRouter } = require('./v1')

const createAppRouter = (settings) => {
    const router = express.Router()

    // serve data API
    router.use('/api/v1', createApiRouter())

    // ssr - serve client app
    // create-react-app-ssr
    router.use(createSSRRouter(settings))

    return router
}

module.exports = {
    createAppRouter,
}
