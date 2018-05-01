const path = require('path')
const fs = require('fs')
const winston = require('winston')
const { Helmet } = require('react-helmet')
const { staticRender } = require('../../src/index.ssr')

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
}) => {
    let data = template
    data = data.replace('<html lang="en">', `<html ${html}>`)
    data = data.replace('</head>', `${head}</head>`)
    data = data.replace('<div id="root"></div>', `<div id="root"></div><script>window.REDUX_INITIAL_STATE = ${JSON.stringify(state)};</script>`)
    data = data.replace('<div id="root"></div>', `<div id="root">${body}</div>`)

    // Use bundles from development website (experimental)
    if (process.env.NODE_ENV === 'development' && process.env.SSR_USE_DYNAMIC_JS === 'yes') {
        data = data.replace(/<link href="\/static\/css\/main.([^\s]*).css" rel="stylesheet">/g, '')
        data = data.replace(/\/static\/js\/main.([^\s]*).js/g, '//localhost:3000/static/js/bundle.js')
    }

    // remove bundle js (dev, experimental)
    winston.debug('disable javascript in SSR?', process.env.SSR_DISABLE_JS)
    if (process.env.SSR_DISABLE_JS === 'yes') {
        data = data.replace(/<script type="text\/javascript" src="\/static\/js\/main.([^\s]*).js"><\/script>/g, '')
    }

    return data
}

const serveApp = () => async (req, res, next) => {
    try {
        const filePath = path.resolve(__dirname, '../../build/index.html')
        const htmlTemplate = await readFile(filePath)
        const PORT = process.env.PORT || 8080
        const initialState = {
            ssr: {
                apiUrl: `http://localhost:${PORT}/api`,
            },
        }
        const prerender = await staticRender(req.url, initialState, 3000)
        const helmet = Helmet.renderStatic()

        // handle simple redirect
        // @TODO: implement status
        if (prerender.context.action === 'REPLACE') {
            res.redirect(prerender.context.url)
            return
        }

        res.send(prepHTML(htmlTemplate, {
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
    serveApp,
}
