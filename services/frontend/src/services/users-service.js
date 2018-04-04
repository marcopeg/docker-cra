
import { getJSON } from 'lib/request'
import { fetchPostsByUserId } from 'services/posts-service'

import {
    setList,
    setDetails,
    setPosts,
    setCurrent,
} from 'reducers/users-reducer'

export const fetchUsers = () => async (dispatch, getState) => {
    const { ssr, users } = getState()

    // cache result
    if (users.list) {
        return users.list
    }

    // get fresh posts
    const items = await ssr.await(getJSON('https://jsonplaceholder.typicode.com/users'))
    dispatch(setList(items))

    return items
}

export const fetchUserById = userId => async (dispatch, getState) => {
    const { ssr, users } = getState()

    // cache result
    if (users.details[userId]) {
        return users.details[userId]
    }

    const data = await ssr.await(getJSON(`https://jsonplaceholder.typicode.com/users/${userId}`))
    dispatch(setDetails(userId, data))

    return data
}

export const loadCurrentUser = userId => async (dispatch) => {
    dispatch(setCurrent(userId))
    dispatch(fetchUserById(userId))
}

export const loadUserPosts = userId => async (dispatch, getState) => {
    const { users } = getState()

    // cache result
    if (users.posts[userId]) {
        return users.posts[userId]
    }
    const posts = await dispatch(fetchPostsByUserId(userId))
    dispatch(setPosts(userId, posts))

    return posts
}
