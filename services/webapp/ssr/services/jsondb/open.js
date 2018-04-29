
const { JsonDB } = require('./db.class')
const cache = require('./cache')

const open = async (nodePath) => {
    if (cache.has(nodePath)) {
        return cache.get(nodePath)
    }

    const instance = new JsonDB(nodePath)

    try {
        await instance.open()
        cache.set(nodePath, instance)
        return instance
    } catch (err) {
        throw new Error(`[JsonDB] failed to open: ${nodePath}`)
    }
}

module.exports = { open }
