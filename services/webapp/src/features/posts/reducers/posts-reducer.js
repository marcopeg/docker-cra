
export const initialState = {
    list: null,
    details: {
        // [postId]: { ...post-details }
    },
    comments: {
        // [postId]: [ ...post-details ]
    },
    current: null,
}

/**
 * Actions
 */

export const SET_LIST = 'setList@posts'
export const SET_DETAILS = 'setDetails@posts'
export const SET_CURRENT = 'setCurrent@posts'
export const SET_COMMENTS = 'setComments@posts'

export const setList = items => ({
    type: SET_LIST,
    payload: items,
})

export const setDetails = (id, data) => ({
    type: SET_DETAILS,
    payload: { id, data },
})

export const setComments = (id, items) => ({
    type: SET_COMMENTS,
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
    [SET_COMMENTS]: (state, action) => ({
        ...state,
        comments: {
            ...state.comments,
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

