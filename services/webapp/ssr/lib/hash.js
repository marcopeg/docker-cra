/**
 * wrapper module for hashing in the project
 * the only important thing here is that the function must be asynchronous
 * so to be able to implement different algorithms in the future
 */

const md5 = require('md5')
const hash = async message => md5(message)

module.exports = {
    hash,
}
