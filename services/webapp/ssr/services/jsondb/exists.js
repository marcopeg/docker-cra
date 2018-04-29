
const { JsonDB } = require('./db.class')
const cache = require('./cache')

const exists = async (nodePath) => {
    if (cache.has(nodePath)) {
        return true
    }

    const instance = new JsonDB(nodePath)

    try {
        await instance.open()
        cache.set(nodePath, instance)
        return true
    } catch (err) {
        return false
    }
}

module.exports = { exists }
