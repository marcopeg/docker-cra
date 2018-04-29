import { notification } from 'antd'
import fetch, { getJSONAuth, postJSONAuth } from 'lib/request'

import { setLists } from '../reducers/tokens-reducer'

export const fetchTokens = () => async (dispatch, getState) => {
    const { ssr, auth } = getState()

    try {
        const endpoint = ssr.apiUrl('/v1/tokens')
        return await getJSONAuth(endpoint, auth.token)
    } catch (err) {
        throw err
    }
}

export const loadTokens = skipCache => async (dispatch, getState) => {
    const { tokens, auth } = getState()

    // skip request if no authorization found
    if (!auth.token) {
        return null
    }

    // cache results in memory
    if (tokens.valid !== null && !skipCache) {
        return { ...tokens }
    }

    try {
        const tokens = await dispatch(fetchTokens())
        dispatch(setLists({ ...tokens }))
        return tokens
    } catch (err) {
        console.log(err.message) // eslint-disable-line
    }
}

export const reloadTokens = () => async (dispatch) => {
    return await dispatch(loadTokens(true))
}

export const generateToken = payload => async (dispatch, getState) => {
    const { ssr, auth } = getState()
    try {
        const endpoint = ssr.apiUrl(`/v1/tokens`)
        await postJSONAuth(endpoint, auth.token, payload)
        dispatch(reloadTokens())
        notification.success({
            message: 'A new token was released',
            duration: 3,
        })
    } catch (err) {
        alert(err.message) // eslint-disable-line
    }
}

export const deleteToken = token => async (dispatch, getState) => {
    const { ssr, auth } = getState()

    // eslint-disable-next-line
    if (confirm(`delete token issued on: ${token.issuedOn}?`)) {
        try {
            const endpoint = ssr.apiUrl('/v1/tokens')
            await fetch(endpoint, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ token: token.token }),
            })
            dispatch(reloadTokens())
            notification.success({
                message: 'Token successfully removed',
                duration: 3,
            })
        } catch (err) {
            alert(err.message) // eslint-disable-line
        }
    }
}

