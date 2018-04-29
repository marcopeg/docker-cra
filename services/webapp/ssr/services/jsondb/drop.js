const path = require('path')
const fs = require('fs')

const config = require('../../lib/config')
const cache = require('./cache')

const dbRoot = config.get('DB_PATH')

const drop = nodePath => new Promise((resolve, reject) => {
    const filePath = path.join(dbRoot, `${nodePath}.json`)

    fs.unlink(filePath, (err) => {
        if (err) {
            reject(err)
            return
        }
        cache.del(nodePath)
        resolve()
    })
})

module.exports = { drop }
