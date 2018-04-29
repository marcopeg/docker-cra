const express = require('express')
const { hash } = require('../../../lib/hash')
const { validatePassword } = require('../../../lib/validate-password')

const validateOldPwd = () => async (req, res, next) => {
    try {
        const h1 = req.data.user.get('/pwd_hash')
        const h2 = await hash(req.body.passw_old)

        if (h1 !== h2) {
            throw new Error('current password mismatch')
        }
    } catch (err) {
        next([ 400, err.message ])
    }
    next()
}

const validateNewPwd = () => async (req, res, next) => {
    try {
        await validatePassword(req.body.passw_new)
    } catch (err) {
        next([ 400, err.message ])
    }
    next()
}

const updatePassw = () => async (req, res, next) => {
    try {
        const h = await hash(req.body.passw_new)
        req.data.user.set('/pwd_hash', h)
        await req.data.user.save()
    } catch (err) {
        next(err)
    }
    next()
}

const createChpwdRouter = () => {
    const router = express.Router()

    router.post('/', [
        validateOldPwd(),
        validateNewPwd(),
        updatePassw(),
    ], async (req, res) => {
        res.send({
            id: req.data.user.id,
            version: req.data.user.get('/version'),
        })
    })

    return router
}

module.exports = {
    createChpwdRouter,
}
