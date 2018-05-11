import React from 'react'
import loadable from 'react-loadable'

/**
 * Synchronous Feature API
 * every resource listed here will partake into the main bundle
 * (reducers are required for correct SSR)
 */

export const reducers = {}

export const services = []

export const listeners = []


/**
 * Asyncronous loading for code-splitting optimization
 * all the containers that are not needed at boot time are
 * delegated to an on-demain loading
 */

export const Posts = loadable({
    loader: () => import('./containers/Posts'),
    loading: () => null,
})

export const PostDetails = loadable({
    loader: () => import('./containers/PostDetails'),
    loading: () => null,
})
