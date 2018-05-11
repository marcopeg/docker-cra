/* eslint-disable */

import React from 'react'
import loadable from 'react-loadable'

import galleryReducer from './reducers/gallery-reducer'

// Synchronous feature API
export const reducers = {
    gallery: galleryReducer,
}
export const services = []
export const listeners = []

export const Gallery = loadable({
    loader: () => import('./containers/Gallery'),
    loading () {
        return <div>loading gallery</div>
    },
})
