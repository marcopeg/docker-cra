
import logger from 'lib/logger'
import matchPath from './match-path'

const createHistoryRouter = routes => location => (dispatch) => {
    if (!location) {
        return
    }

    const { pathname } = location

    try {
        const { action, match } = routes
            .map(route => ({
                ...route,
                match: matchPath(pathname, {
                    path: route.path,
                    exact: route.exact,
                }),
            }))
            .filter(route => route.match)
            .shift()

        if (action) {
            dispatch(action(match.params, match))
            dispatch({
                type: '@@route::fired',
                payload: {
                    ...location,
                    params: match.params,
                },
            })
        }
    } catch (e) {
        logger.verbose('Path handler not found for:', pathname)
    }
}

export default createHistoryRouter
