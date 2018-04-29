/**
 * Validate a provided JWT token against server's secret
 * and user's version (optional)
 */

const jwt = require('../services/jwt')
const { hash } = require('../lib/hash')
const jsondb = require('../services/jsondb')

const validateJwt = (skipVersion) => async (req, res, next) => {
    try {
        req.data.jwtToken = req.get('Authorization').split('Bearer ')[1]
        if (!req.data.jwtToken) {
            throw new Error('empty bearer!')
        }
    } catch (err) {
        next([ 400, 'Misspelled authorization header' ])
        return
    }

    try {
        req.data.jwtInfo = await jwt.verify(req.data.jwtToken)
        req.data.jwt = req.data.jwtInfo.payload
    } catch (err) {
        next([ 400, 'Invalid token' ])
        return
    }

    // forcefully skip version control for the released token
    if (skipVersion === 'skipVersion') {
        next()
        return
    }

    try {
        req.data.jwtUser = await jsondb.open(`/users/${req.data.jwt.uname}`)
    } catch (err) {
        next([ 400, 'User not found' ])
        return
    }

    if (req.data.jwt.version !== req.data.jwtUser.get('/version')) {
        next([ 400, 'Expired token' ])
        return
    }

    // skip session checksum if not provided by the token
    // session token have "checksm", app tokens don't
    // in this case we need to verify that the token exists in user's list
    if (!req.data.jwt.checksm) {
        const availableTokens = req.data.jwtUser.get('/tokens')
        const tokenExists = availableTokens.some(token => token.token === req.data.jwtToken)
        if (!tokenExists) {
            next([ 400, 'Token not found' ])
            return
        }

        next()
        return
    }

    // the checksum on "pwd_hash" guarantee that any session token is
    // automatically invalidated when the password is changed for any user
    try {
        const checksm = await hash(req.data.jwtUser.get('/pwd_hash'))
        if (req.data.jwt.checksm !== checksm) {
            next([ 400, 'Token version mismatch' ])
            return
        }
    } catch (err) {
        next(err)
        return
    }

    next()
}

module.exports = {
    validateJwt,
}
