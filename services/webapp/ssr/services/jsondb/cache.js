
const cache = new Map()

const has = key => cache.has(key)

const get = key => cache.get(key)

const set = (key, val) => cache.set(key, val)

const del = key => cache.delete(key)

const clear = () => cache.clear()

module.exports = {
    has,
    get,
    set,
    del,
    clear,
}
