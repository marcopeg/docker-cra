
import createHistoryRouter from 'lib/redux-history-router'
import { LOCATION_CHANGE } from 'features/location'
import { RESET_TOKEN } from 'features/auth'
import { resetList, resetUser } from '../reducers/users-reducer'

import {
    loadUsers,
} from '../services/users-service'

const applyRoutes = createHistoryRouter([
    {
        path: '/users',
        exact: true,
        action: loadUsers,
    },
])

export default [
    {
        type: LOCATION_CHANGE,
        handler: action => (dispatch, getState) => applyRoutes(action.payload)(dispatch, getState),
    },
    // cleanup data on logout
    {
        type: RESET_TOKEN,
        handler: () => dispatch => {
            dispatch(resetList())
            dispatch(resetUser())
        },
    },
]
