import features from 'features'

// Application level listeners
// (your application listeners might override feature's ones)
const appReducers = {
    // app: require('./app-reducer').default,
}

// Inject features' reducers
let featuredReducers = {}
features.forEach((feature) => {
    featuredReducers = {
        ...featuredReducers,
        ...feature.reducers,
    }
})

// Inject application's reducers
export default {
    ...featuredReducers,
    ...appReducers,
}
