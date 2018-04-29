const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const config = require('../../lib/config')

const dbRoot = config.get('DB_PATH')

const ensureFilePath = filePath => new Promise((resolve, reject) => {
    const onlyPath = path.dirname(filePath)
    mkdirp(onlyPath, err => err ? reject(err) : resolve())
})

const readJson = filePath => new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            reject(err)
            return
        }

        try {
            resolve(JSON.parse(data))
        } catch (err) {
            throw new Error(`parsing error in: ${filePath} (${err.message})`)
        }
    })
})

const saveJson = (filePath, data) => new Promise((resolve, reject) => {
    try {
        const content = JSON.stringify(data)
        fs.writeFile(filePath, content, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    } catch (err) {
        reject(err)
    }
})

class JsonDB {
    constructor (nodePath, initialData = {}) {
        this.id = nodePath
        this.nodePath = nodePath
        this.filePath = path.join(dbRoot, `${nodePath}.json`)
        this.data = initialData
    }

    async open () {
        try {
            this.data = await readJson(this.filePath)
        } catch (err) {
            throw new Error(`[JsonDB] ${err.message}`)
        }
    }

    async save () {
        try {
            await ensureFilePath(this.filePath)
            await saveJson(this.filePath, this.data)
        } catch (err) {
            throw new Error(`[JsonDB] ${err.message}`)
        }
    }

    // implement simple xpath in json object
    get (xpath) {
        const tokens = xpath.split('/').filter(t => t)
        let data = { ...this.data }
        for (const token of tokens) {
            if (Array.isArray(data[token])) {
                data = [...data[token]]
            } else if (typeof data[token] === 'object') {
                data = { ...data[token] }
            } else {
                data = data[token]
            }
        }
        return data
    }

    ref (xpath) {
        const tokens = xpath.split('/').filter(t => t)
        let data = { ...this.data }
        for (const token of tokens) {
            data = data[token]
        }
        return data
    }

    push (xpath, value) {
        this.ref(xpath).push(value)
    }

    set (xpath, value) {
        const tokens = xpath.split('/').filter(t => t)
        let data = this.data

        for (const token of tokens) {
            if (typeof data[token] === 'object' || Array.isArray(data[token])) {
                data = data[token]
            } else {
                data[token] = value
                return
            }
        }

        // Replace contents of an array
        if (Array.isArray(data)) {
            data.splice(0, data.length, ...value)
            return
        }

        // Replace contents of an object
        if (typeof data === 'object') {
            throw new Error('replace of objects is not YET supported')
        }
    }
}

module.exports = {
    JsonDB,
}
