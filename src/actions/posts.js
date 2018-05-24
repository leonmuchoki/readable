import * as ReadableAPI from '../utils/ReadableAPI';

export const GET_POSTS = 'GET_POSTS'
export const ADD_NEW_POST = 'ADD_NEW_POST'
export const POSTS_HAS_ERRORED = 'POSTS_HAS_ERRORED'
export const POSTS_IS_LOADING = 'POSTS_IS_LOADING'
export const POSTS_FETCH_DATA_SUCCESS = 'POSTS_FETCH_DATA_SUCCESS'
export const UPDATE_POST_COMMENT_COUNT = 'UPDATE_POST_COMMENT_COUNT'
export const DELETE_POST = 'DELETE_POST'
export const POSTS_DELETE_SUCCESS = 'POSTS_DELETE_SUCCESS'
export const POST_VOTE_SUCCESS = 'POST_VOTE_SUCCESS'
export const POST_GET_DATA_SUCCESS = 'POST_GET_DATA_SUCCESS'

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

// get post detail
export function postGetDataSuccess(postData) {
  return {
    type: POST_GET_DATA_SUCCESS,
    postData
  }
}

export function getPostData(id) {
  return (dispatch) => {
    dispatch(postsIsLoading(true));

    ReadableAPI.getPost(id)
                .then((response)=> {
                  dispatch(postsIsLoading(false));
                  return response
                })
                .then((data)=> {
                  console.log('postGetDataSuccess ' + JSON.stringify(data))
                  dispatch(postGetDataSuccess(data))
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
                  //console.log('postDeleteSuccess ' + JSON.stringify(data))
                  dispatch(postDeleteSuccess(data))
                })
                .catch(()=> dispatch(postsHasErrored(true)))  
  }
}

// vote on post:
export function postVoteSuccess(voteData) {
  return {
    type: POST_VOTE_SUCCESS,
    voteData
  }
}

export function postVote(postId,post_body) {
  return (dispatch) => {
    dispatch(postsIsLoading(true));

    ReadableAPI.voteOnPost(postId,post_body)
                .then((response)=> {
                  dispatch(postsIsLoading(false));
                  return response
                })
                .then((data)=> {
                  console.log('postVoteSuccess ' + JSON.stringify(data))
                  dispatch(postVoteSuccess(data))
                })
                .catch(()=> dispatch(postsHasErrored(true)))  
  }
}