
const { JsonDB } = require('./db.class')

const create = async (nodePath, initialData) => new JsonDB(nodePath, initialData)

module.exports = { create }
