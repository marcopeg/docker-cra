const path = require('path')
const fs = require('fs')
const winston = require('winston')
const { Helmet } = require('react-helmet')
// const { staticRender } = require('../../../../src/index.ssr')

const readFile = (filePath, encoding = 'utf8') => new Promise((resolve, reject) => {
    if (readFile.cache[filePath]) {
        return resolve(readFile.cache[filePath])
    }

    try {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                reject(err)
                return
            }
            readFile.cache[filePath] = data
            resolve(data)
        })
    } catch (err) {
        reject(err)
    }
})

// setup file cache memoization
readFile.cache = {}

const prepHTML = (template, {
    html,
    head,
    body,
    state,
    ssrDisableJs,
    ssrUseWebpackJs,
    nodeEnv,
}) => {
    let data = template
    data = data.replace('<html lang="en">', `<html ${html}>`)
    data = data.replace('</head>', `${head}</head>`)

    console.log('DISABLE JE', ssrDisableJs)
    // avoid to send out the redux state if client js is disabled
    if (ssrDisableJs !== 'yes') {
        // eslint-disable-next-line
        data = data.replace('<div id="root"></div>', `<div id="root"></div><script>window.REDUX_INITIAL_STATE = ${JSON.stringify(state)};</script>`)
    }

    data = data.replace('<div id="root"></div>', `<div id="root">${body}</div>`)

    // Use bundles from development website (experimental)
    if (nodeEnv === 'development' && ssrUseWebpackJs === 'yes') {
        data = data.replace(/<link href="\/static\/css\/main.([^\s]*).css" rel="stylesheet">/g, '')
        data = data.replace(/\/static\/js\/main.([^\s]*).js/g, '//localhost:3000/static/js/bundle.js')
    }

    // remove bundle js (dev, experimental)
    if (ssrDisableJs === 'yes') {
        data = data.replace(/<script type="text\/javascript" src="\/static\/js\/main.([^\s]*).js"><\/script>/g, '')
    }

    return data
}

/**
 * Settings:
 * - ssrBuild (string) - client app build folder
 * - ssrPort: (string) - ssr server port for default api calls
 * - ssrTimeout: (int) - rendering timeout in milliseconds
 * - ssrDisableJs: (string)[yes|no]
 * - ssrUseDynamicJs: (string)[yes|no]
 * - nodeEnv: (string)[development|production]
 */
let staticRender = null
const serveAppSSR = (settings = {}) => async (req, res, next) => {
    try {
        winston.verbose(`[ssr] ${req.url}`)

        // try to import the staticRender function from the app's source code
        if (!staticRender) {
            staticRender = require(path.join(settings.ssrRoot, 'index.ssr')).staticRender
        }

        const filePath = path.resolve(path.join(settings.ssrBuild, 'index.html'))
        const htmlTemplate = await readFile(filePath)
        const initialState = {
            ssr: {
                serverUrl: `http://localhost:${settings.ssrPort}`,
                apiUrl: `http://localhost:${settings.ssrPort}/api`,
            },
        }
        const prerender = await staticRender(req.url, initialState, {
            timeout: settings.ssrTimeout,
            userAgent: req.headers['user-agent'],
        })
        const helmet = Helmet.renderStatic()

        // handle simple redirect
        // @TODO: implement status
        if (prerender.context.action === 'REPLACE') {
            res.redirect(prerender.context.url)
            return
        }

        res.send(prepHTML(htmlTemplate, {
            ...settings,
            html: helmet.htmlAttributes.toString(),
            head: [
                helmet.title.toString(),
                helmet.meta.toString(),
                helmet.link.toString(),
            ].join(''),
            body: prerender.html,
            state: prerender.initialState,
        }))
    } catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports = {
    serveAppSSR,
}
