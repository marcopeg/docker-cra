
import imagesReducer from './reducers/images-reducer'
import imagesListener from './listeners/images-listener'
import * as imagesService from './services/images-service'

const registerFeature = async (store) => {
    console.log('-- register feature images')
    await store.registerReducer('images', imagesReducer)
    await store.registerService(imagesService)
    await store.registerListener(imagesListener)
}

export default registerFeature
