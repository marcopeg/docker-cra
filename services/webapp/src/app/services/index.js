import features from 'features'

// Application level listeners
// (your application listeners might override feature's ones)
const appServices = [
    // require('./foo-service'),
]

// Inject features' services
let featuredServices = []
features.forEach((feature) => {
    featuredServices = [
        ...featuredServices,
        ...feature.services,
    ]
})

// Inject application's services
const services = [
    ...featuredServices,
    ...appServices,
]

export const configServices = async (store, history) => {
    let service
    for (service of services) {
        if (service.init) {
            await service.init(store, history)(store.dispatch, store.getState)
        }
    }
    for (service of services) {
        if (service.start) {
            await service.start(store, history)(store.dispatch, store.getState)
        }
    }
}
