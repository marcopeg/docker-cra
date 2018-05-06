
const express = require('express')

/**
 * Settings
 * - ssrBuild (string) - client app build folder
 */
const serveBuild = (settings) => express.static(settings.ssrBuild)

module.exports = {
    serveBuild,
}
