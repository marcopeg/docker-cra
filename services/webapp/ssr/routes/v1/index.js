const express = require('express')
const bodyParser = require('body-parser')
// const config = require('../../lib/config')
// const { requestData } = require('../../middlewares/request-data')
// const { validateJwt } = require('../../middlewares/validate-jwt')
// const { validateGrants } = require('../../middlewares/validate-grants')

// const { createAuthRouter } = require('./auth')
// const { createTokensRouter } = require('./tokens')
// const { createElsRouter } = require('./els')
// const { createCerberusRouter } = require('./cerberus')
// const { createUsersRouter } = require('./users')
// const { createUtilsRouter } = require('./utils')

const router = express.Router()

router.use(bodyParser.json())

router.get('/', (req, res) => res.send('+ok api v1'))

// router.use('/auth', [
//     requestData(),
// ], createAuthRouter())

// router.use('/tokens', [
//     requestData(),
//     validateJwt(),
//     validateGrants('tokens:*'),
// ], createTokensRouter())

// router.use('/els', [
//     requestData(),
//     validateJwt(),
//     validateGrants('els:?'), // @TODO: "els:?"" to accept any possible sub-grant
// ], createElsRouter())

// router.use('/users', [
//     requestData(),
//     validateJwt(),
//     validateGrants('users:*'),
// ], createUsersRouter())

// router.use('/cerberus', [
//     requestData(),
//     validateJwt(),
//     validateGrants('cerberus:*'),
// ], createCerberusRouter())

// // Development stuff
// if (config.isDev()) {
//     router.use('/utils', createUtilsRouter())
// }

module.exports = {
    router,
}
