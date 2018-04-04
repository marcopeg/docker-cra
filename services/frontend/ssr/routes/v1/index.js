const express = require('express')
const bodyParser = require('body-parser')
const { router: posts } = require('./posts')

const router = express.Router()

router.use(bodyParser.json())

router.get('/', (req, res) => res.send('+ok api v1'))
router.use('/posts', posts)

module.exports = {
    router,
}
