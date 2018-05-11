
import menuReducer from './reducers/menu-reducer'


/**
 * Synchronous Feature API
 * every resource listed here will partake into the main bundle
 * (reducers are required for correct SSR)
 */

export const reducers = {
    menu: menuReducer,
}

export const services = []

export const listeners = []


/**
 * Synchronous loading of the Menu component as part of any
 * possible rendering activity. It wouldn't make much sense
 * having it loaded in an asynchronous way.
 */

export { default as Menu } from './containers/Menu'
