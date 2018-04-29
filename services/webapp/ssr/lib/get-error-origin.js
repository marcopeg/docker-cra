
function getErrorOrigin (errorStack) {
    try {
        const tokens = errorStack.split('\n').filter(item => item.indexOf('_callee') !== -1)
        let origin = tokens.shift().trim()
        origin = origin.substring(origin.indexOf('_callee') + 10)
        origin = origin.substring(0, origin.indexOf(')'))
        return origin
    } catch (e) {
        return JSON.stringify(errorStack)
    }
}

module.exports = getErrorOrigin
