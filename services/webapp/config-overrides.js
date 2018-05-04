/* config-overrides.js */

const rewireEslint = require('react-app-rewire-eslint')
const rewireStylus = require('react-app-rewire-stylus-modules')
const rewireInlinSource = require('react-app-rewire-inline-source')

module.exports = function override (config, env) {
    config = rewireEslint(config, env)
    config = rewireStylus(config, env)
    config = rewireInlinSource(config, env, {
        inlineSource: '.(css)$',
    })

    return config
}
