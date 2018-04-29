
import createHistoryRouter from 'lib/redux-history-router'
import { LOCATION_CHANGE } from 'features/location'
import { RESET_TOKEN } from 'features/auth'
import { resetLists } from '../reducers/tokens-reducer'

import {
    loadTokens,
} from '../services/tokens-service'

const applyRoutes = createHistoryRouter([
    {
        path: '/tokens',
        exact: true,
        action: loadTokens,
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
            dispatch(resetLists())
        },
    },
]
