
export const initialState = {
    title: 'The Gallery',
    list: null,
}

/**
 * Actions
 */

/**
 * Handlers
 */

export const actionHandlers = {}

export const reducer = (state = initialState, action) => {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export default reducer

