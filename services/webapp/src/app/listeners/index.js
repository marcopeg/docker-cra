import features from 'features'

// Application level listeners
// (your application listeners might override feature's ones)
const appListeners = [
    // require('./foo-listener),
]

// Inject features' liteners
let featuredListeners = []
features.forEach((feature) => {
    if (!feature.listeners) {
        console.log('warning: missing listeners')
        console.log(feature)
        return
    }
    featuredListeners = [
        ...featuredListeners,
        ...feature.listeners,
    ]
})

// Inject application's liteners
const listeners = [
    ...featuredListeners,
    ...appListeners,
]

// eslint-disable-next-line
export const configListeners = (events) =>
    listeners
        .map(listener => listener.default)
        .map(listener => events.registerListener(listener))
