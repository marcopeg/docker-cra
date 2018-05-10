/* eslint-disable */

import React from 'react'
import loadable from 'react-loadable'

export const Images = loadable({
    loader: () => import('./containers/Images'),
    loading () {
        return <div>loading</div>
    },
})

// Synchronous register feature function
export default null
