const { create } = require('./create')
const { exists } = require('./exists')
const { open } = require('./open')
const { clear } = require('./cache')
const { list } = require('./list')
const { drop } = require('./drop')

module.exports = {
    init: () => {}, // for service api compatibility
    start: () => {}, // for service api compatibility
    exists,
    create,
    open,
    list,
    drop,
    clearCache: clear,
}
