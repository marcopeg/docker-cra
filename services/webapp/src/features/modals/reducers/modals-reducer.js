
export const initialState = {}

/**
 * Actions
 */

export const SET = 'set@modals'

export const setModal = (id, data) => ({
    type: SET,
    payload: { id, data },
})

/**
 * Handlers
 */

export const actionHandlers = {
    [SET]: (state, action) => ({
        ...state,
        [action.payload.id]: action.payload.data,
    }),
}

export const reducer = (state = initialState, action) => {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export default reducer

