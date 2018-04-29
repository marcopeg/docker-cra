
export const initialState = {
    list: null,
    active: null,
}

/**
 * Actions
 */

export const SET_LIST = 'setList@users'
export const RESET_LIST = 'resetList@users'
export const SET_USER = 'setUser@users'
export const RESET_USER = 'resetUser@users'

export const setList = value => ({
    type: SET_LIST,
    payload: value,
})

export const resetList = value => ({
    type: RESET_LIST,
})

export const setUser = value => ({
    type: SET_USER,
    payload: value,
})

export const resetUser = value => ({
    type: RESET_USER,
})


/**
 * Handlers
 */

export const actionHandlers = {
    [SET_LIST]: (state, action) => ({
        ...state,
        list: [...action.payload],
    }),
    [RESET_LIST]: (state, action) => ({
        ...state,
        list: null,
    }),
    [SET_USER]: (state, action) => ({
        ...state,
        active: { ...action.payload },
    }),
    [RESET_USER]: (state, action) => ({
        ...state,
        active: null,
    }),
}

export const reducer = (state = initialState, action) => {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export default reducer

