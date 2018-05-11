/* eslint-disable */

// import galleryReducer from './reducers/gallery-reducer'
import galleryListener from './listeners/gallery-listener'
import * as galleryService from './services/gallery-service'

const registerFeature = async (store) => {
    console.log('-- register feature: gallery')
    store.registerAsyncFeature({
        reducers: {
            // gallery: galleryReducer,
        },
        listeners: [galleryListener],
        services: [galleryService]
    })
}

export default registerFeature
