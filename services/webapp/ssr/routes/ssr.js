const express = require('express')

const { serveBuild } = require('../middlewares/serve-build')

/**
 * Router creator
 * it can receive configuration as parameter
 */

const createSsrRouter = (settings) => {
    const router = express.Router()

    // serve client app
    let serveApp = null
    if (settings.ssrEnabled === 'yes') {
        const { serveAppSSR } = require('../middlewares/serve-app-ssr')
        serveApp = serveAppSSR
    } else {
        const { serveAppStatic } = require('../middlewares/serve-app-static')
        serveApp = serveAppStatic
    }

    router.get('/', serveApp(settings))
    router.use(serveBuild(settings))
    router.get('*', serveApp(settings))

    return router
}

module.exports = {
    createSsrRouter,
}
