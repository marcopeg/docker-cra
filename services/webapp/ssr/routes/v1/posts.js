const express = require('express')


/**
 * Custom Middlewares
 * they compose the core logic for this router
 */

const getPostsList = () => async (req, res, next) => {
    try {
        const data = await fetch('https://jsonplaceholder.typicode.com/posts')
        const json = await data.json()
        res.send(json.map(post => ({
            id: post.id,
            userId: post.userId,
            title: post.title,
        })))
    } catch (err) {
        next(err)
    }
}

const getPostDetails = () => async (req, res, next) => {
    try {
        const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${req.params.id}`)
        const json = await data.json()
        res.send(json)
    } catch (err) {
        next(err)
    }
}


/**
 * Router creator
 * it can receive configuration as parameter
 */

const createPostsRouter = () => {
    const router = express.Router()

    router.get('/:id', [
        getPostDetails(),
    ])

    router.get('/', [
        getPostsList(),
    ])

    return router
}

module.exports = {
    createPostsRouter,
}
