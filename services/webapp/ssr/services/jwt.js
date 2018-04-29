
const jwt = require('jsonwebtoken')

let secret = null

const init = (settings) => {
    secret = settings.secret
}

const sign = (payload, settings = {}, customSecret = secret) =>
    new Promise((resolve, reject) => {
        const localSettings = {
            ...settings,
            expiresIn: settings.expiresIn || '30s',
        }

        jwt.sign({ payload }, customSecret, localSettings, (err, token) => {
            if (err) {
                reject(err)
            } else {
                resolve(token)
            }
        })
    })

const verify = (token, customSecret = secret) =>
    new Promise((resolve, reject) => {
        jwt.verify(token, customSecret, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })

module.exports = {
    init,
    sign,
    verify,
}
