const express = require('express')

const jsondb = require('../../../services/jsondb')
const { validateGrants } = require('../../../middlewares/validate-grants')

const { createListUsersRouter } = require('./list-users')
const { createGetUserRouter } = require('./get-user')
const { createChpwdRouter } = require('./chpwd')
const { createNewUserRouter } = require('./new-user')
const { createUpdateUserRouter } = require('./update-user')
const { createDeleteUserRouter } = require('./delete-user')

const getUser = () => async (req, res, next) => {
    try {
        req.data.user = await jsondb.open(`/users/${req.params.uname}`)
    } catch (err) {
        next([ 400, 'user not found!' ])
    }

    next()
}

const createUsersRouter = () => {
    const router = express.Router()

    router.use('/', [
        validateGrants('users:create'),
    ], createNewUserRouter())

    router.use('/', [
        validateGrants('users:list'),
    ], createListUsersRouter())

    router.use('/:uname/chpwd', [
        validateGrants('users:chpwd'),
        getUser(),
    ], createChpwdRouter())

    router.use('/:uname', [
        validateGrants('users:update'),
        getUser(),
    ], createUpdateUserRouter())

    router.use('/:uname', [
        validateGrants('users:read'),
        getUser(),
    ], createGetUserRouter())

    router.use('/:uname', [
        validateGrants('users:delete'),
        getUser(),
    ], createDeleteUserRouter())

    return router
}

module.exports = {
    createUsersRouter,
}
