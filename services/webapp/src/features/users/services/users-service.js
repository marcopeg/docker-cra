
import fetch, { getJSONAuth, postJSONAuth, putJSONAuth } from 'lib/request'
import { closeModal } from 'features/modals'

import {
    setList,
    resetList,
    setUser,
    resetUser,
} from '../reducers/users-reducer'

export const fetchUsers = () => async (dispatch, getState) => {
    const { ssr, auth } = getState()

    try {
        const endpoint = ssr.apiUrl('/v1/users')
        return await getJSONAuth(endpoint, auth.token)
    } catch (err) {
        throw err
    }
}

export const fetchUser = uname => async (dispatch, getState) => {
    const { ssr, auth } = getState()

    try {
        const endpoint = ssr.apiUrl(`/v1/users/${uname}`)
        return await getJSONAuth(endpoint, auth.token)
    } catch (err) {
        throw err
    }
}

export const loadUsers = () => async (dispatch, getState) => {
    const { users, auth } = getState()

    // skip request if no authorization found
    if (!auth.token) {
        return null
    }

    // cache results in memory
    if (users.list !== null) {
        return users.list
    }

    try {
        const users = await dispatch(fetchUsers())
        dispatch(setList(users))
        return users
    } catch (err) {
        console.log(err.message) // eslint-disable-line
    }
}

export const reloadUsers = () => async (dispatch) => {
    dispatch(resetList())
    dispatch(resetUser())
    return await dispatch(loadUsers())
}

export const loadUser = uname => async (dispatch, getState) => {
    dispatch(resetUser())
    try {
        const user = await dispatch(fetchUser(uname))
        dispatch(setUser(user))
    } catch (err) {
        alert(err.message) // eslint-disable-line
    }
}

export const changeUserPassw = (user, oldPassw, newPassw) => async (dispatch, getState) => {
    const { ssr, auth } = getState()
    try {
        const endpoint = ssr.apiUrl(`/v1/users/${user}/chpwd`)
        await postJSONAuth(endpoint, auth.token, {
            passw_old: oldPassw,
            passw_new: newPassw,
        })
        alert('done!') // eslint-disable-line
    } catch (err) {
        alert(err.message) // eslint-disable-line
    }
}

export const createUser = (uname, passw, grant) => async (dispatch, getState) => {
    const { ssr, auth } = getState()
    try {
        const endpoint = ssr.apiUrl('/v1/users')
        await postJSONAuth(endpoint, auth.token, {
            uname,
            passw,
            grant: JSON.parse(grant),
        })
        dispatch(closeModal('newusr'))
        dispatch(reloadUsers())
    } catch (err) {
        alert(err.message) // eslint-disable-line
    }
}

export const updateUser = (uname, props) => async (dispatch, getState) => {
    console.log('update', uname, props)
    const { ssr, auth } = getState()
    try {
        const endpoint = ssr.apiUrl(`/v1/users/${uname}`)
        await putJSONAuth(endpoint, auth.token, {
            grant: JSON.parse(props.grant),
        })
        alert('done!') // eslint-disable-line
    } catch (err) {
        alert(err.message) // eslint-disable-line
    }
}

export const deleteUser = (uname, props) => async (dispatch, getState) => {
    const { ssr, auth } = getState()

    // eslint-disable-next-line
    if (confirm(`delete: ${uname}?`)) {
        try {
            const endpoint = ssr.apiUrl(`/v1/users/${uname}`)
            await fetch(endpoint, {
                method: 'DELETE',
                headers: {
                    Authorization: auth.token,
                },
            })
            dispatch(closeModal('editusr'))
            dispatch(reloadUsers())
        } catch (err) {
            alert(err.message) // eslint-disable-line
        }
    }
}
