const express = require('express')
const bodyParser = require('body-parser')

/**
 * Import sub routers
 */

const { createUsersRouter } = require('./users')
const { createPostsRouter } = require('./posts')

/**
 * Router creator
 * it can receive configuration as parameter
 */

const createApiRouter = () => {
    const router = express.Router()

    router.use(bodyParser.json())

    router.use('/users', [
        createUsersRouter(),
    ])

    router.use('/posts', [
        createPostsRouter(),
    ])

    router.get('/', (req, res) => res.send('+ok api v1'))

    return router
}

module.exports = {
    createApiRouter,
}
