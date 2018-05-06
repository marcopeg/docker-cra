const path = require('path')

/**
 * Settings
 * - ssrBuild (string) - client app build folder
 */
const serveAppStatic = (settings) => async (req, res, next) => {
    res.sendFile(path.join(settings.ssrBuild, 'index.html'))
}

module.exports = {
    serveAppStatic,
}
