import { getJSON } from '@marcopeg/utils/lib/request'

import {
    setList,
    setDetails,
} from '../reducers/posts-reducer'

export const fetchPosts = () => (dispatch, getState) => {
    const { ssr } = getState()
    const endpoint = ssr.apiUrl('/v1/posts')
    return ssr.await(getJSON(endpoint))
}

export const fetchPost = postId => (dispatch, getState) => {
    const { ssr } = getState()
    const endpoint = ssr.apiUrl(`/v1/posts/${postId}`)
    return ssr.await(getJSON(endpoint))
}

export const loadPosts = () => async (dispatch, getState) => {
    const { posts } = getState()

    // return cached result
    if (posts.list) {
        return posts.list
    }

    // run a real posts fetch action
    try {
        const items = await dispatch(fetchPosts())
        dispatch(setList(items))
    } catch (err) {
        console.error(err)
    }
}

export const loadPost = postId => async (dispatch, getState) => {
    const { posts } = getState()

    // return cached result
    if (posts.details[postId]) {
        return posts.details[postId]
    }

    // run a real post details fetch action
    try {
        const data = await dispatch(fetchPost(postId))
        dispatch(setDetails(postId, data))
    } catch (err) {
        console.error(err)
    }
}
