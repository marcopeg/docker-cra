const path = require('path')

/**
 * Settings
 * - ssrRoot (string) - client app build folder
 */
const serveAppStatic = (settings) => async (req, res, next) => {
    res.sendFile(path.join(settings.ssrRoot, 'index.html'))
}

module.exports = {
    serveAppStatic,
}
