import * as ReadableAPI from '../utils/ReadableAPI';

export const ADD_COMMENT = 'ADD_COMMENT'
export const GET_COMMENTS = 'GET_COMMENTS'
export const GET_POSTS = 'GET_POSTS'
export const ADD_NEW_POST = 'ADD_NEW_POST'
export const POSTS_HAS_ERRORED = 'POSTS_HAS_ERRORED'
export const POSTS_IS_LOADING = 'POSTS_IS_LOADING'
export const POSTS_FETCH_DATA_SUCCESS = 'POSTS_FETCH_DATA_SUCCESS'

export function getComments({comments, postIdComment}) { //{id,timestamp,body,author,parentId,voteScore,deleted,parentDeleted}
 return {
  type: GET_COMMENTS,
  comments,
  postIdComment
 }
}

export function addComment({comments, postIdComment}) { //{id,timestamp,body,author,parentId,voteScore,deleted,parentDeleted}
 return {
  type: ADD_COMMENT,
  comments,
  postIdComment
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
                .then((data)=> dispatch(postsFetchDataSuccess(data)))
                .then((data)=> {
                    const allPosts = {allPosts: data}
                    dispatch(getPosts(allPosts))
                })
                .catch(()=> dispatch(postsHasErrored(true)))  
  }
}