/* eslint global-require: off */

import { routerReducer as routing } from 'react-router-redux'

export default {
    app: require('./app-reducer').default,
    posts: require('./posts-reducer').default,
    users: require('./users-reducer').default,
    routing,
}
