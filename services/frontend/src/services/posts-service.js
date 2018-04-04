import { getJSON } from 'lib/request'
// import { initFetch, setData, } from 'reducers/post-reducer'
import { setList, setCurrent, setDetails, setComments } from 'reducers/posts-reducer'
import { fetchUserById } from 'services/users-service'

export const fetchPostsList = () => async (dispatch, getState) => {
    const { ssr } = getState()
    console.log(ssr.apiUrl('/v1/posts'))
    return ssr.await(getJSON(ssr.apiUrl('/v1/posts')))
}

export const fetchPostById = postId => async (dispatch, getState) => {
    const { ssr, posts } = getState()

    // cache data
    if (posts.details[postId]) {
        return posts.details[postId]
    }

    const data = await ssr.await(getJSON(`https://jsonplaceholder.typicode.com/posts/${postId}`))
    dispatch(setDetails(postId, data))

    return data
}

export const fetchPostsByUserId = userId => async (dispatch, getState) => {
    const { ssr } = getState()
    return ssr.await(getJSON(`https://jsonplaceholder.typicode.com/posts/?userId=${userId}`))
}

export const loadInitialPosts = () => async (dispatch, getState) => {
    const { posts } = getState()

    // cache result
    if (posts.list) {
        return posts.list
    }

    const items = await dispatch(fetchPostsList())
    dispatch(setList(items))

    return items
}

export const loadCurrentPost = postId => async (dispatch) => {
    await dispatch(setCurrent(postId))
    const post = await dispatch(fetchPostById(postId))
    return post
}

export const loadPostAuthor = post => async dispatch =>
    dispatch(fetchUserById(post.userId))

export const loadPostComments = post => async (dispatch, getState) => {
    const { ssr, posts } = getState()

    // cache local data
    if (posts.comments[post.id]) {
        return posts.comments[post.id]
    }

    const items = await ssr.await(getJSON(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`))
    dispatch(setComments(post.id, items))

    return items
}
