
import { rerun, LOCATION_RELOAD } from '../services/location-service'

export default [
    {
        type: LOCATION_RELOAD,
        handler: (action, ctx) => dispatch => setTimeout(() => dispatch(rerun(ctx.history))),
    },
]
