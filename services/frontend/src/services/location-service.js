/**
 * Register to the history manager and trigger the history
 * events as redux actions
 */

export const LOCATION_CHANGE = '@@location::change'

export const init = (store, history) => dispatch =>
    history.listen(match => dispatch({
        type: LOCATION_CHANGE,
        payload: match,
    }))

export const start = (store, history) => dispatch =>
    dispatch({
        type: LOCATION_CHANGE,
        payload: history.location,
    })
