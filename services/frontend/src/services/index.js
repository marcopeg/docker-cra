
const services = [
    require('./location-service'),
    require('./posts-service'),
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
