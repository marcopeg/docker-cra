/* config-overrides.js */

const rewireEslint = require('react-app-rewire-eslint')
const rewireStylus = require('react-app-rewire-stylus-modules')

module.exports = function override (config, env) {
    config = rewireEslint(config, env)
    config = rewireStylus(config, env)
    return config
}
