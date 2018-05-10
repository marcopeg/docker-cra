
export const initialState = {
    name: 'docker-cra',
    isReady: false,
    settings: {},
}

/**
 * Actions
 */

export const SET_VALUE = 'setValue@menu'
export const SET_IS_READY = 'setIsReady@menu'

export const setValue = (key, value) => ({
    type: SET_VALUE,
    payload: { key, value },
})

export const setIsReady = value => ({
    type: SET_IS_READY,
    payload: value,
})

/**
 * Handlers
 */

export const actionHandlers = {
    [SET_VALUE]: (state, action) => ({
        ...state,
        settings: {
            ...state.settings,
            [action.payload.key]: action.payload.value,
        },
    }),
    [SET_IS_READY]: (state, action) => ({
        ...state,
        isLoading: action.payload,
    }),
}

export const reducer = (state = initialState, action) => {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}

export default reducer

