
import createHistoryRouter from 'redux-history-router'
import { LOCATION_CHANGE } from 'redux-events-middleware/lib/location'

/**
 * Syncronous loading, single bundle optimization
 * (comment out if using code-splitting)
 */
// import {
//     loadUsers,
//     loadUser,
//     loadUserPosts,
// } from '../services/users-service'

const applyRoutes = createHistoryRouter([
    /**
     * Syncronous loading, single bundle optimization
     * (comment out if using code-splitting)
     */
    // {
    //     path: '/users/:userId/details',
    //     action: params => loadUser(params.userId),
    // },
    // {
    //     path: '/users/:userId/posts',
    //     action: params => loadUserPosts(params.userId),
    // },
    // {
    //     path: '/users/:userId?',
    //     action: loadUsers,
    // },

    /**
     * Asyncronous loading for code-splitting optimization
     * all the services that are not needed at boot time are
     * delegated to an on-demain loading
     */
    {
        path: '/users/:userId/details',
        action: params => async (dispatch) => {
            const { loadUser } = await import('../services/users-service')
            dispatch(loadUser(params.userId))
        },
    },
    {
        path: '/users/:userId/posts',
        action: params => async (dispatch) => {
            const { loadUserPosts } = await import('../services/users-service')
            dispatch(loadUserPosts(params.userId))
        },
    },
    {
        path: '/users/:userId?',
        action: params => async (dispatch) => {
            const { loadUsers } = await import('../services/users-service')
            dispatch(loadUsers())
        },
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
