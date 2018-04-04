
import createHistoryRouter from 'lib/redux-history-router'
import { LOCATION_CHANGE } from 'services/location-service'

import {
    loadInitialPosts,
    loadCurrentPost,
    loadPostAuthor,
    loadPostComments,
} from 'services/posts-service'

const applyRoutes = createHistoryRouter([
    {
        path: '/p',
        exact: true,
        action: () => async dispatch => dispatch(loadInitialPosts()),
    },
    {
        path: '/p/:postId/:subMenu(author|comments)?',
        action: ({ postId, subMenu }) => async (dispatch, getState) => {
            const post = await dispatch(loadCurrentPost(postId))

            // load sub-route data
            if (subMenu === 'author') {
                dispatch(loadPostAuthor(post))
            } else if (subMenu === 'comments') {
                dispatch(loadPostComments(post))
            }
        },
    },
])

export default [{
    type: LOCATION_CHANGE,
    handler: action => (dispatch, getState) => applyRoutes(action.payload)(dispatch, getState),
}]
