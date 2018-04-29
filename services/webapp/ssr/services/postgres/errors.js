/**
 * Describe custom errors for module "config"
 */

const getErrorOrigin = require('../../lib/get-error-origin')

class MissingConnectionHandlerPostgresError extends Error {
    constructor (message) {
        super()
        Error.captureStackTrace(this)
        this.name = 'MissingConnectionHandlerPostgresError'
        this.message = message
        this.origin = getErrorOrigin(this.stack)
    }
}

class ConnectionFailedPostgresError extends Error {
    constructor (message) {
        super()
        Error.captureStackTrace(this)
        this.name = 'ConnectionFailedPostgresError'
        this.message = message
        this.origin = getErrorOrigin(this.stack)
    }
}

class SyncModelPostgresError extends Error {
    constructor (message) {
        super()
        Error.captureStackTrace(this)
        this.name = 'SyncModelPostgresError'
        this.message = message
        this.origin = getErrorOrigin(this.stack)
    }
}

class ModelNotFoundPostgresError extends Error {
    constructor (message) {
        super()
        Error.captureStackTrace(this)
        this.name = 'ModelNotFoundPostgresError'
        this.message = message
        this.origin = getErrorOrigin(this.stack)
    }
}

module.exports = {
    MissingConnectionHandlerPostgresError,
    ConnectionFailedPostgresError,
    SyncModelPostgresError,
    ModelNotFoundPostgresError,
}
