
export const initialState = {
    token: null,
    errorMsg: null,
}

/**
 * Actions
 */

export const SET_TOKEN = 'setToken@auth'
export const RESET_TOKEN = 'resetToken@auth'
export const SET_ERROR = 'setError@auth'
export const RESET_ERROR = 'resetError@auth'

export const setToken = token => ({
    type: SET_TOKEN,
    payload: token,
})

export const resetToken = token => ({
    type: RESET_TOKEN,
})

export const setError = errorMsg => ({
    type: SET_ERROR,
    payload: errorMsg,
})

export const resetError = errorMsg => ({
    type: RESET_ERROR,
})


/**
 * Handlers
 */

export const actionHandlers = {
    [SET_TOKEN]: (state, action) => ({
        ...state,
        token: action.payload,
    }),
    [RESET_TOKEN]: (state, action) => ({
        ...state,
        token: null,
    }),
    [SET_ERROR]: (state, action) => ({
        ...state,
        errorMsg: action.payload,
    }),
    [RESET_ERROR]: (state, action) => ({
        ...state,
        errorMsg: null,
    }),
}

export const reducer = (state = initialState, action) => {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export default reducer

