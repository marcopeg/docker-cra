const express = require('express')

const createGetUserRouter = () => {
    const router = express.Router()

    router.get('/', async (req, res) => {
        res.send({
            id: req.data.user.id,
            version: req.data.user.get('/version'),
            grant: req.data.user.get('/grant'),
        })
    })

    return router
}

module.exports = {
    createGetUserRouter,
}
