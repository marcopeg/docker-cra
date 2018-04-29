
const pause = require('../../lib/pause')

const connectionHandler = require('./connection-handler')
const errors = require('./errors')

const establishConnection = async (conn, maxAttempts, attemptDelay) => {
    let attempts = 0
    let lastErrorMSG = ''
    do {
        try {
            conn.logger(`[db:${conn.name}] Connection attempt ${attempts + 1}/${maxAttempts}`)
            await conn.handler.authenticate()
            return true
        } catch (e) {
            attempts += 1
            lastErrorMSG = e.message
            conn.logger(`[db:${conn.name}] failed: ${e.message}`)
            await pause(attemptDelay * 1000)
        }
    } while (attempts < maxAttempts)

    throw new Error(lastErrorMSG)
}

const initModels = async (conn, models) => {
    const promises = models.map(model => new Promise(async (resolve, reject) => {
        try {
            conn.logger(`[db:${conn.name}] init model ${model.name}`)
            const instance = await model.init(conn.handler)
            connectionHandler.pushModel(conn, instance)
            resolve()
        } catch (err) {
            conn.logger(`[db:${conn.name}] failed to init model: ${model.name}`)
            conn.logger(`[db:${conn.name}] Error: ${err.message}`)
            reject({ model, err })
        }
    }))

    return Promise.all(promises)
}

const start = async (name, settings) => {
    const conn = connectionHandler.get(name)
    const { maxAttempts, attemptDelay } = settings

    if (!conn) {
        throw new errors.MissingConnectionHandlerPostgresError(`[db:${name}]`)
    }

    try {
        await establishConnection(conn, maxAttempts, attemptDelay)
    } catch (err) {
        throw new errors.ConnectionFailedPostgresError(`[db:${name}] ${err.message}`)
    }

    try {
        await initModels(conn, settings.models)
    } catch (err) {
        throw new errors.SyncModelPostgresError(`[db:${name}] model: ${err.model.name}, ${err.err.message}`)
    }
}

module.exports = start
