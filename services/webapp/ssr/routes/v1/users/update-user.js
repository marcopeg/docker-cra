const express = require('express')
const { validateGrants } = require('../../../lib/validate-grants')

const validateGrant = () => async (req, res, next) => {
    try {
        await validateGrants(req.body.grant)
    } catch (err) {
        next([ 400, err.message ])
    }
    next()
}

const updateUser = () => async (req, res, next) => {
    try {
        req.data.user.set('/grant', req.body.grant)
        await req.data.user.save()
    } catch (err) {
        next(err)
    }

    next()
}

const createUpdateUserRouter = () => {
    const router = express.Router()

    router.put('/', [
        validateGrant(),
        updateUser(),
    ], async (req, res) => {
        res.send({
            id: req.data.user.id,
            version: req.data.user.get('/version'),
            grant: req.data.user.get('/grant'),
        })
    })

    return router
}

module.exports = {
    createUpdateUserRouter,
}
