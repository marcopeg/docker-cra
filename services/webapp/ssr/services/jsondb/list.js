const fs = require('fs')
const path = require('path')
const config = require('../../lib/config')

const dbRoot = config.get('DB_PATH')

const list = listName => new Promise((resolve, reject) => {
    const listPath = path.join(dbRoot, listName)

    fs.readdir(listPath, (err, files) => {
        if (err) {
            reject(err)
            return
        }
        const docs = files
            .filter(file => file.indexOf('.json') !== -1)
            .map(file => file.slice(0, -5))

        resolve(docs)
    })
})

module.exports = {
    list,
}
