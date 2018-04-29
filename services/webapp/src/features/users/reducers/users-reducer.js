
export const initialState = {
    list: null,
    details: {
        // [userId]: { ...user-details }
    },
    posts: {
        // [userId]: [ ...user-posts ]
    },
    current: null,
}

/**
 * Actions
 */

export const SET_LIST = 'setList@users'
export const SET_DETAILS = 'setDetails@users'
export const SET_POSTS = 'setPosts@users'
export const SET_CURRENT = 'setCurrent@users'

export const setList = items => ({
    type: SET_LIST,
    payload: items,
})

export const setDetails = (id, data) => ({
    type: SET_DETAILS,
    payload: { id, data },
})

export const setPosts = (id, items) => ({
    type: SET_POSTS,
    payload: { id, items },
})

export const setCurrent = id => ({
    type: SET_CURRENT,
    payload: id,
})

/**
 * Handlers
 */

export const actionHandlers = {
    [SET_LIST]: (state, action) => ({
        ...state,
        list: action.payload,
    }),
    [SET_DETAILS]: (state, action) => ({
        ...state,
        details: {
            ...state.details,
            [action.payload.id]: action.payload.data,
        },
    }),
    [SET_POSTS]: (state, action) => ({
        ...state,
        posts: {
            ...state.posts,
            [action.payload.id]: action.payload.items,
        },
    }),
    [SET_CURRENT]: (state, action) => ({
        ...state,
        current: action.payload,
    }),
}

export const reducer = (state = initialState, action) => {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export default reducer

