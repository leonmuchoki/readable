import * as ReadableAPI from '../utils/ReadableAPI';

export const ADD_COMMENT = 'ADD_COMMENT'
export const GET_COMMENTS = 'GET_COMMENTS'
export const COMMENTS_HAS_ERRORED = 'COMMENTS_HAS_ERRORED'
export const COMMENTS_IS_LOADING = 'COMMENTS_IS_LOADING'
export const COMMENTS_FETCH_DATA_SUCCESS = 'COMMENTS_FETCH_DATA_SUCCESS'
export const POST_COMMENTS_FETCHED = 'POST_COMMENTS_FETCHED'
export const COMMENT_IS_POSTING = 'COMMENT_IS_POSTING'
export const UPDATE_POST_COMMENT_COUNT = 'UPDATE_POST_COMMENT_COUNT'
export const COMMENT_DELETE_SUCCESS = 'COMMENT_DELETE_SUCCESS'
export const COMMENT_VOTE_SUCCESS = 'COMMENT_VOTE_SUCCESS'

export function getComments({comments, postIdComment}) { //{id,timestamp,body,author,parentId,voteScore,deleted,parentDeleted}
 return {
  type: GET_COMMENTS,
  comments,
  postIdComment
 }
}

export function addComment(comments, postIdComment) { //{id,timestamp,body,author,parentId,voteScore,deleted,parentDeleted}
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

// add new comment:
export function commentIsPosting(bool) {
  return {
    type: COMMENT_IS_POSTING,
    isPosting: bool
  };
}

export function updatePostCommentCount(comment) {
  return {
    type: UPDATE_POST_COMMENT_COUNT,
    comment
  }
}

export function postNewCommentData(values_to_post,postIdComment) {
  return (dispatch) => {
    dispatch(commentIsPosting(true));

    ReadableAPI.createNewComment(values_to_post)
                .then((response)=> {
                  dispatch(commentIsPosting(false));
                  return response
                })
                .then((comments)=> {
                  dispatch(addComment(comments, postIdComment))
                  return comments
                })
                .then((comment)=>{
                  //console.log('updatePostCommentCount ' + JSON.stringify(comment))
                  dispatch(updatePostCommentCount(comment))
                })
                .catch(()=> dispatch(commentsHasErrored(true)))  
  }
}

// delete comment:
export function commentDeleteSuccess(comment) {
  return {
    type: COMMENT_DELETE_SUCCESS,
    comment
  }
}

export function commentDelete(commentId) {
  return (dispatch) => {
    dispatch(commentIsPosting(true));

    ReadableAPI.deleteComment(commentId)
                .then((response)=> {
                  dispatch(commentIsPosting(false));
                  return response
                })
                .then((data)=> {
                  //console.log('commentDeleteSuccess ' + JSON.stringify(data))
                  dispatch(commentDeleteSuccess(data))
                })
                .catch(()=> dispatch(commentsHasErrored(true)))  
  }
}

// vote on comment
export function commentVoteSuccess(commentVoted) {
  return {
    type: COMMENT_VOTE_SUCCESS,
    commentVoted
  }
}

export function commentVote(commentId, postBody) {
  return (dispatch) => {
    dispatch(commentIsPosting(true));

    ReadableAPI.voteOnComment(commentId, postBody)
                .then((response)=> {
                  dispatch(commentIsPosting(false));
                  return response
                })
                .then((data)=> {
                  //console.log('commentDeleteSuccess ' + JSON.stringify(data))
                  dispatch(commentVoteSuccess(data))
                })
                .catch(()=> dispatch(commentsHasErrored(true)))  
  }
}