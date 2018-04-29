/**
 * Apply a simple permission validation schemas to protect routes
 * with actions that are granted to a jwt token.
 *
 */

const grant = require('../lib/grant')

const validateGrants = (grants) => async (req, res, next) => {
    if (!grant(req.data.jwt.grant, grants)) {
        res.status(402).send('invalid grant')
        return
    }

    next()
}

module.exports = {
    validateGrants,
}
