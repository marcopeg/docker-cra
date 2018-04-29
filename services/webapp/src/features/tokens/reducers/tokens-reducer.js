
export const initialState = {
    valid: null,
    invalid: null,
}

/**
 * Actions
 */

export const SET_LISTS = 'setLists@users'
export const RESET_LISTS = 'resetLists@users'

export const setLists = ({ valid, invalid }) => ({
    type: SET_LISTS,
    payload: { valid, invalid },
})

export const resetLists = () => ({
    type: RESET_LISTS,
})


/**
 * Handlers
 */

export const actionHandlers = {
    [SET_LISTS]: (state, action) => ({
        ...state,
        valid: [...action.payload.valid],
        invalid: [...action.payload.invalid],
    }),
    [RESET_LISTS]: (state, action) => ({
        ...state,
        valid: null,
        invalid: null,
    }),
}

export const reducer = (state = initialState, action) => {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export default reducer

