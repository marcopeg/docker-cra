const path = require('path')

const serveApp = () => async (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../build/index.html'))
}

module.exports = {
    serveApp,
}
