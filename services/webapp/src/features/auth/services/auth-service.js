
import {
    getJSONAuth,
    postJSON,
} from 'lib/request'

import {
    setError,
    resetError,
    setToken,
    resetToken,
} from '../reducers/auth-reducer'

// save token to local storage or session storage
export const storeToken = token => (dispatch) => {
    dispatch(setToken(token))
    localStorage.setItem('jwt', token)
}

export const retrieveToken = () => (dispatch) => {
    const token = localStorage.getItem('jwt')
    dispatch(setToken(token))
}

export const removeToken = () => (dispatch) => {
    dispatch(resetToken())
    localStorage.removeItem('jwt')
}

export const login = (uname, passw) => async (dispatch, getState) => {
    const { ssr } = getState()
    dispatch(resetError())
    try {
        const res = await postJSON(ssr.apiUrl('/v1/auth'), { uname, passw })
        dispatch(storeToken(res.token))
    } catch (err) {
        dispatch(setError(err.message))
    }
}

export const checkLogin = () => async (dispatch, getState) => {
    const { ssr, auth } = getState()
    if (!auth.token) {
        return
    }

    try {
        await getJSONAuth(ssr.apiUrl('/v1/auth'), auth.token)
        dispatch(resetError())
    } catch (err) {
        if (err.response && err.response.status === 400) {
            dispatch(removeToken())
        } else {
            dispatch(setError(err.message))
        }
    }
}

export const init = retrieveToken

export const start = checkLogin
