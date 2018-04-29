const express = require('express')
const jsondb = require('../../../services/jsondb')

const createListUsersRouter = () => {
    const router = express.Router()

    router.get('/', async (req, res) => {
        const docs = await jsondb.list('/users')
        res.send(docs)
    })

    return router
}

module.exports = {
    createListUsersRouter,
}
