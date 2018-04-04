const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const data = await fetch('https://jsonplaceholder.typicode.com/posts')
    const json = await data.json()
    res.send(json)
})

module.exports = {
    router,
}
