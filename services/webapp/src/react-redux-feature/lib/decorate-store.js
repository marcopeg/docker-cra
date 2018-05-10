
export const decorateStore = (store, history, events) => {
    store.registeredReducers = []
    store.registeredServices = []
    store.registeredListeners = []

    store.registerReducer = (key, fn) => {
        console.log('register reducer', key, fn)
    }

    store.registerService = async (service) => {
        // prevent multiple initialization
        if (store.registeredServices.indexOf(service) !== -1) return
        store.registeredServices.push(service)

        // initialize the service
        // @TODO: improve error handling
        service.init && await service.init(store, history)(store.dispatch, store.getState)
        service.start && await service.start(store, history)(store.dispatch, store.getState)
    }

    store.registerListener = (listener) => {
        // prevent multiple initialization
        if (store.registeredListeners.indexOf(listener) !== -1) return
        store.registeredListeners.push(listener)

        // register listener
        console.log('register listener', listener)
        events && events.registerListener(listener)
    }

    return store
}
