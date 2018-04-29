const express = require('express')
const jsondb = require('../../../services/jsondb')

const deleteUser = () => async (req, res, next) => {
    try {
        await jsondb.drop(req.data.user.id)
    } catch (err) {
        next(err)
    }

    next()
}

const createDeleteUserRouter = () => {
    const router = express.Router()

    router.delete('/', [
        deleteUser(),
    ], async (req, res) => {
        res.send('ok')
    })

    return router
}

module.exports = {
    createDeleteUserRouter,
}
