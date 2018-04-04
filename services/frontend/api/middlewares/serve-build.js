const path = require('path')
const express = require('express')

const serveBuild = () => express.static(path.resolve(__dirname, '..', '..', 'build'))

module.exports = {
    serveBuild,
}
