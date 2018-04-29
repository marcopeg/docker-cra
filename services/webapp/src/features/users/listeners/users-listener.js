
import createHistoryRouter from 'lib/redux-history-router'
import { LOCATION_CHANGE } from 'features/location'

import {
    loadUsers,
} from '../services/users-service'

const applyRoutes = createHistoryRouter([
    {
        path: '/users/:userId?',
        exact: true,
        action: loadUsers,
    },
])

export default [
    {
        type: LOCATION_CHANGE,
        handler: action => (dispatch, getState) => applyRoutes(action.payload)(dispatch, getState),
    },
]
