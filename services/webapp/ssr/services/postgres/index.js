
const init = require('./init')
const start = require('./start')
const connectionHandler = require('./connection-handler')

module.exports = {
    init,
    start,
    getModel: connectionHandler.getModel,
    getConnection: connectionHandler.get,
}
