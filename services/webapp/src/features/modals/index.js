
export const reducers = {
    modals: require('./reducers/modals-reducer').default,
}

export const services = [
    require('./services/modals-service'),
]

export const listeners = []

export { withModal } from './containers/Modal'

export { openModal, closeModal } from './services/modals-service'
