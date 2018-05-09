/* config-overrides.js */

const rewireEslint = require('react-app-rewire-eslint')
const rewireStylus = require('react-app-rewire-stylus-modules')
const rewireInlinSource = require('react-app-rewire-inline-source')
const rewireReactLoadable = require('create-react-app-ssr/lib/rewire-react-loadable')

module.exports = function override (config, env) {
    config = rewireEslint(config, env)
    config = rewireStylus(config, env)

    // production bundle optimizations
    if (process.env.NODE_ENV === 'production') {
        config = rewireInlinSource(config, env, {
            inlineSource: '.(css)$',
        })
        config = rewireReactLoadable(config)
    }

    return config
}
