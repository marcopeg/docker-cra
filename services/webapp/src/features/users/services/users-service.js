
import { getJSON } from '@marcopeg/utils/lib/request'
import { rerun } from 'redux-events-middleware/lib/location/services/location-service'

import {
    setList,
    setDetails,
    setPosts,
} from '../reducers/users-reducer'

export const fetchUsers = () => (dispatch, getState) => {
    const { ssr } = getState()
    const endpoint = ssr.apiUrl('/v1/users')
    return ssr.await(getJSON(endpoint))
}

export const fetchUser = userId => (dispatch, getState) => {
    const { ssr } = getState()
    const endpoint = ssr.apiUrl(`/v1/users/${userId}`)
    return ssr.await(getJSON(endpoint))
}

export const fetchUserPosts = userId => (dispatch, getState) => {
    const { ssr } = getState()
    const endpoint = ssr.apiUrl(`/v1/users/${userId}/posts`)
    return ssr.await(getJSON(endpoint))
}

export const loadUsers = () => async (dispatch, getState) => {
    const { users } = getState()

    // return cached result
    if (users.list) {
        return users.list
    }

    // run a real users fetch action
    try {
        const items = await dispatch(fetchUsers())
        dispatch(setList(items))
    } catch (err) {
        console.error(err)
    }
}

export const loadUser = userId => async (dispatch, getState) => {
    const { users } = getState()

    // return cached result
    if (users.details[userId]) {
        return users.details[userId]
    }

    // run a real user details fetch action
    try {
        const data = await dispatch(fetchUser(userId))
        dispatch(setDetails(userId, data))
    } catch (err) {
        console.error(err)
    }
}

export const loadUserPosts = userId => async (dispatch, getState) => {
    const { users } = getState()

    // return cached result
    if (users.posts[userId]) {
        return users.posts[userId]
    }

    // run a real user details fetch action
    try {
        const items = await dispatch(fetchUserPosts(userId))
        dispatch(setPosts(userId, items))
    } catch (err) {
        console.error(err)
    }
}

// re-run the last route onload
// that is because this feature is loaded after a route action
export const start = (store, history) => rerun(history)
