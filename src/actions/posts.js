import * as ReadableAPI from '../utils/ReadableAPI';

export const GET_POSTS = 'GET_POSTS'
export const ADD_NEW_POST = 'ADD_NEW_POST'
export const POSTS_HAS_ERRORED = 'POSTS_HAS_ERRORED'
export const POSTS_IS_LOADING = 'POSTS_IS_LOADING'
export const POSTS_FETCH_DATA_SUCCESS = 'POSTS_FETCH_DATA_SUCCESS'
export const UPDATE_POST_COMMENT_COUNT = 'UPDATE_POST_COMMENT_COUNT'
export const DELETE_POST = 'DELETE_POST'
export const POSTS_DELETE_SUCCESS = 'POSTS_DELETE_SUCCESS'

export function updatePostCommentCount(postId,commentCount) {
  return {
    type: UPDATE_POST_COMMENT_COUNT,
    postId,
    commentCount
  }
}

export function getPosts({allPosts}) {
  return {
    type: GET_POSTS,
    allPosts
  }
}

export function addNewPost({post}) {
  return {
    type: ADD_NEW_POST,
    post
  };
}

/* export function deletePost(postId) {
  return {
    type: DELETE_POST,
    postId
  }
} */

export function postDeleteSuccess(allPosts) {
  return {
    type: POSTS_DELETE_SUCCESS,
    allPosts
  };
}

export function postsHasErrored(bool) {
  return {
    type: POSTS_HAS_ERRORED,
    hasErrored: bool
  };
}

export function postsIsLoading(bool) {
  return {
    type: POSTS_IS_LOADING,
    isLoading: bool
  };
}

export function postsFetchDataSuccess(allPosts) {
  return {
    type: POSTS_FETCH_DATA_SUCCESS,
    allPosts
  }
}

// fetch posts:
export function postsFetchData() {
  return (dispatch) => {
    dispatch(postsIsLoading(true));

    ReadableAPI.getAllPosts()
                .then((response)=> {
                  dispatch(postsIsLoading(false));
                  return response
                })
                .then((data)=> {
                  //const allPosts = {allPosts: data}
                  dispatch(postsFetchDataSuccess(data))
                })
                .catch(()=> dispatch(postsHasErrored(true)))  
  }
}

// delete posts:
export function postDelete(postId) {
  return (dispatch) => {
    dispatch(postsIsLoading(true));

    ReadableAPI.deletePost(postId)
                .then((response)=> {
                  dispatch(postsIsLoading(false));
                  return response
                })
                .then((data)=> {
                  console.log('postDeleteSuccess ' + JSON.stringify(data))
                  dispatch(postDeleteSuccess(data))
                })
                .catch(()=> dispatch(postsHasErrored(true)))  
  }
}