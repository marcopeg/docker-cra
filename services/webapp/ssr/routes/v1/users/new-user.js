const express = require('express')
const { validatePassword } = require('../../../lib/validate-password')
const { validateGrants } = require('../../../lib/validate-grants')
const { hash } = require('../../../lib/hash')
const jsondb = require('../../../services/jsondb')

const validatePwd = () => async (req, res, next) => {
    try {
        await validatePassword(req.body.passw)
    } catch (err) {
        next([ 400, err.message ])
    }
    next()
}

const validateGrant = () => async (req, res, next) => {
    try {
        await validateGrants(req.body.grant)
    } catch (err) {
        next([ 400, err.message ])
    }
    next()
}

const validateUname = () => async (req, res, next) => {
    try {
        if (!req.body.uname) {
            throw new Error('missing username')
        }
        if (typeof req.body.uname !== 'string') {
            throw new Error('username must be a string')
        }
        if (await jsondb.exists(`/users/${req.body.uname}`)) {
            throw new Error('username already taken')
        }
    } catch (err) {
        next([ 400, err.message ])
    }

    next()
}

const createUser = () => async (req, res, next) => {
    try {
        req.data.user = await jsondb.create(`/users/${req.body.uname}`, {
            pwd_hash: await hash(req.body.passw),
            grant: req.body.grant,
            version: new Date(),
            tokens: [],
        })
        await req.data.user.save()
    } catch (err) {
        next([ 500, 'failed to save user' ])
    }

    next()
}

const createNewUserRouter = () => {
    const router = express.Router()

    router.post('/', [
        validatePwd(),
        validateGrant(),
        validateUname(),
        createUser(),
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
    createNewUserRouter,
}
