import { getJSON } from 'lib/request'
// import { fetchPostsByUserId } from 'services/posts-service'

import {
    setList,
    // setDetails,
    // setPosts,
    // setCurrent,
} from '../reducers/users-reducer'

export const fetchUsers = () => (dispatch, getState) => {
    const { ssr } = getState()
    const endpoint = ssr.apiUrl('/v1/users')
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

// export const fetchUserById = userId => async (dispatch, getState) => {
//     const { ssr, users } = getState()

//     // cache result
//     if (users.details[userId]) {
//         return users.details[userId]
//     }

//     const data = await ssr.await(getJSON(`https://jsonplaceholder.typicode.com/users/${userId}`))
//     dispatch(setDetails(userId, data))

//     return data
// }

// export const loadCurrentUser = userId => async (dispatch) => {
//     dispatch(setCurrent(userId))
//     dispatch(fetchUserById(userId))
// }

// export const loadUserPosts = userId => async (dispatch, getState) => {
//     const { users } = getState()

//     // cache result
//     if (users.posts[userId]) {
//         return users.posts[userId]
//     }
//     // const posts = await dispatch(fetchPostsByUserId(userId))
//     const posts = []
//     dispatch(setPosts(userId, posts))

//     return posts
// }
