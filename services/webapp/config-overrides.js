/* config-overrides.js */

const rewireEslint = require('react-app-rewire-eslint')
const rewireStylus = require('react-app-rewire-stylus-modules')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')

module.exports = function override (config, env) {
    config = rewireEslint(config, env)
    config = rewireStylus(config, env)

    // Inline CSS & Javascript
    if (env === 'production') {
        let HtmlWebpackPluginIdx = null
        config.plugins.map((plugin, idx) => {
            if (plugin.options && plugin.options.template) {
                HtmlWebpackPluginIdx = idx
                plugin.options.inlineSource = '.(css)$' // '.(js|css)$'
            }
            return plugin
        })

        if (HtmlWebpackPluginIdx === null) {
            config.plugins.push(new HtmlWebpackInlineSourcePlugin())
        } else {
            config.plugins.splice(HtmlWebpackPluginIdx + 1, 0, new HtmlWebpackInlineSourcePlugin())
        }
    }

    return config
}
