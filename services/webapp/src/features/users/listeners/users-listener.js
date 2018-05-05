
import createHistoryRouter from 'redux-history-router'
import { LOCATION_CHANGE } from 'features/location'

import {
    loadUsers,
    loadUser,
    loadUserPosts,
} from '../services/users-service'

const applyRoutes = createHistoryRouter([
    {
        path: '/users/:userId/details',
        action: params => loadUser(params.userId),
    },
    {
        path: '/users/:userId/posts',
        action: params => loadUserPosts(params.userId),
    },
    {
        path: '/users/:userId?',
        action: loadUsers,
    },
], {
    allowMultipleRoutes: true,
})

export default [
    {
        type: LOCATION_CHANGE,
        handler: action => (dispatch, getState) => applyRoutes(action.payload)(dispatch, getState),
    },
]
