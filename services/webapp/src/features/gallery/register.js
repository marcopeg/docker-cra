import galleryReducer from './reducers/gallery-reducer'
import galleryListener from './listeners/gallery-listener'
import * as galleryService from './services/gallery-service'

const register = (store) => store.registerAsyncFeature({
    reducers: {
        gallery: galleryReducer,
    },
    listeners: [
        galleryListener,
    ],
    services: [
        galleryService,
    ],
})

export default register
