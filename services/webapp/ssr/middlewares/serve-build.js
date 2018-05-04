
const express = require('express')

/**
 * Settings
 * - ssrRoot (string) - client app build folder
 */
const serveBuild = (settings) => express.static(settings.ssrRoot)

module.exports = {
    serveBuild,
}
