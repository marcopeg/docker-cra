
import { LOCATION_RELOAD } from 'features/location'
import { SET_TOKEN } from '../reducers/auth-reducer'

export default [
    // after login happens the route is being executed again
    // to allow for login based data loading to happen correctly
    {
        type: SET_TOKEN,
        handler: action => dispatch => dispatch({ type: LOCATION_RELOAD }),
    },
]
