import * as ReadableAPI from '../utils/ReadableAPI';

export const ADD_COMMENT = 'ADD_COMMENT'
export const GET_COMMENTS = 'GET_COMMENTS'
export const COMMENTS_HAS_ERRORED = 'COMMENTS_HAS_ERRORED'
export const COMMENTS_IS_LOADING = 'COMMENTS_IS_LOADING'
export const COMMENTS_FETCH_DATA_SUCCESS = 'COMMENTS_FETCH_DATA_SUCCESS'
export const POST_COMMENTS_FETCHED = 'POST_COMMENTS_FETCHED'

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

export function commentsHasErrored(bool) {
  return {
    type: COMMENTS_HAS_ERRORED,
    hasErrored: bool
  };
}

export function commentsIsLoading(bool) {
  return {
    type: COMMENTS_IS_LOADING,
    isLoading: bool
  };
}

export function postCommentsFetched(bool,postId) {
  return {
    type: POST_COMMENTS_FETCHED,
    isFetched: bool,
    postId: postId
  }
}

export function commentsFetchDataSuccess(comments) {
  return {
    type: COMMENTS_FETCH_DATA_SUCCESS,
    comments
  }
}

// fetch posts:
export function commentsFetchData(postId) {
  return (dispatch) => {
    dispatch(commentsIsLoading(true));

    ReadableAPI.getPostComments(postId)
                .then((response)=> {
                  dispatch(commentsIsLoading(false));
                  return response
                })
                .then((response)=>{
                  dispatch(postCommentsFetched(true, postId))
                  return response
                })
                .then((data)=> {
                  dispatch(commentsFetchDataSuccess(data))
                })
                .then((comments)=> {
                  //dispatch(getComments({comments, postId}))
                })
                .catch(()=> dispatch(commentsHasErrored(true)))  
  }
}

