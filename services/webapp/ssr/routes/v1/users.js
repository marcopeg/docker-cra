const express = require('express')


/**
 * Custom Middlewares
 * they compose the core logic for this router
 */

const getUsersList = () => async (req, res, next) => {
    try {
        const data = await fetch('https://jsonplaceholder.typicode.com/users')
        const json = await data.json()
        const items = json
            .map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
                username: user.username,
            }))
            // used to test different responses in different SSR rendering
            // .filter((item) => (Math.random() < 0.5))
        res.send(items)
    } catch (err) {
        next(err)
    }
}

const getUserDetails = () => async (req, res, next) => {
    try {
        const data = await fetch(`https://jsonplaceholder.typicode.com/users/${req.params.id}`)
        const json = await data.json()
        res.send(json)
    } catch (err) {
        next(err)
    }
}

const getUserPosts = () => async (req, res, next) => {
    try {
        const data = await fetch(`https://jsonplaceholder.typicode.com/posts/?userId=${req.params.id}`)
        const json = await data.json()
        res.send(json.map(post => ({
            id: post.id,
            title: post.title,
        })))
    } catch (err) {
        next(err)
    }
}


/**
 * Router creator
 * it can receive configuration as parameter
 */

const createUsersRouter = () => {
    const router = express.Router()

    router.get('/:id/posts', [
        getUserPosts(),
    ])

    router.get('/:id', [
        getUserDetails(),
    ])

    router.get('/', [
        getUsersList(),
    ])

    return router
}

module.exports = {
    createUsersRouter,
}
