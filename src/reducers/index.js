import { combineReducers } from 'redux'

import { GET_POSTS, ADD_NEW_POST, POSTS_FETCH_DATA_SUCCESS,
         POSTS_IS_LOADING, POSTS_HAS_ERRORED, POSTS_DELETE_SUCCESS, POST_VOTE_SUCCESS,
         POST_GET_DATA_SUCCESS, POST_IS_CREATED, CATEGORY_POSTS_FETCH_DATA_SUCCESS } from '../actions/posts';
import { COMMENTS_IS_LOADING, COMMENTS_HAS_ERRORED, COMMENTS_FETCH_DATA_SUCCESS,
         POST_COMMENTS_FETCHED, COMMENT_IS_POSTING, ADD_COMMENT, UPDATE_POST_COMMENT_COUNT,
         GET_COMMENTS, COMMENT_DELETE_SUCCESS, COMMENT_VOTE_SUCCESS } from '../actions/comments';


//----COMMENTS
export function commentsHasErrored(state = false, action) {
  switch(action.type) {
    case POSTS_HAS_ERRORED:
      return action.hasErrored;
    
    default:
      return state;
  }
}

export function commentsIsLoading(state = false, action) {
  switch (action.type) {
    case POSTS_IS_LOADING:
      return action.isLoading; 
    
    default:
      return state;
  }
}

export function commentIsPosting(state = false, action) {
  switch (action.type) {
    case COMMENT_IS_POSTING:
      return action.isPosting; 
    
    default:
      return state;
  }
}


const postCommentsState = {
  isFetched: false,
  postId: ''
}
export function postCommentsFetched(state = postCommentsState, action) {
  switch (action.type) {
    case POST_COMMENTS_FETCHED:
      return Object.assign({},state,
                        {isFetched: action.isFetched}, 
                        {postId: action.postId}) 
    
    default:
      return state;
  }
}

const initialStateComments = {
  comments: [],
  postIdComment: ""
}

function comments(state=initialStateComments, action) {
  const { comments, postIdComment, comment } = action
  
  switch(action.type) {
    case GET_COMMENTS:
      //console.log('reducer GET_COMMENTS:: ' + JSON.stringify(cs))
      return Object.assign({},state,
        {comments: [
          ...state.comments, 
          ...comments]},
          {postIdComment: postIdComment})
    
    case ADD_COMMENT:
      //console.log('reducer ADD_COMMENT::' + JSON.stringify(comments) + '===postIdComment::' + postIdComment)
      return  Object.assign({},state,
        {comments: [
          ...state.comments, comments
        ]},
        {postIdComment: postIdComment})
      //Object.assign({},state,{ comments: comments, postIdComment: postIdComment })

    case COMMENTS_FETCH_DATA_SUCCESS:
      //console.log('reducer COMMENTS_FETCH_DATA_SUCCESS:: ' + JSON.stringify(comments))
      return Object.assign({},state,
        {comments: [
          ...state.comments, 
          ...comments]},
          {postIdComment: postIdComment})

    case COMMENT_DELETE_SUCCESS:
      //console.log('reducer COMMENT_DELETE_SUCCESS:X: ' + JSON.stringify(action.comment))
      //return state
      let newStateComments = state.comments.map((c,index)=>{
        if(c.id === action.comment.id) {
          let n = Object.assign({},c,action.comment)
          return n
        } else {
          return c
        }
      })
      //console.log('COMMENTS_DELETE_SUCCESS:X:' + JSON.stringify(newStateComments))
      return Object.assign({},state,{comments: newStateComments})

    case COMMENT_VOTE_SUCCESS:
      //console.log('COMMENT_VOTE_SUCCESS:V:' + JSON.stringify(action.commentVoted))
      let newStateCommentsAfterVote = state.comments.map((c,index)=>{
        if(c.id === action.commentVoted.id) {
          let updatedComment = action.commentVoted
          updatedComment.voteScore = updatedComment.voteScore + 1
          let n = Object.assign({},c,updatedComment)
          return n
        } else {
          return c
        }
      })
      //console.log('COMMENTS_DELETE_SUCCESS:X:' + JSON.stringify(newStateCommentsAfterVote))
      return Object.assign({},state,{comments: newStateCommentsAfterVote})

    default:
      return state
  }
}

//-------POSTS
const postsInitialState = {
  allPosts: [],
  fetched: false
}

function allPosts(state=postsInitialState, action) {
  const { allPosts, post, postId, postedData } = action
  switch(action.type) {
    case ADD_NEW_POST:
      //console.log('reducer ADD_NEW_POST::' + JSON.stringify(action.postedData))
      return Object.assign({},state,
                                  {allPosts: [
                                    ...state.allPosts, postedData
                                  ]})//Object.assign({},state,action.post )//Object.assign({},state,{ ...state.allPosts, ...action.post })

    case GET_POSTS:
      //console.log('reducer post::' + JSON.stringify(allPosts))
      return Object.assign({},state,
                              {allPosts: [
                                ...state.allPosts, 
                                ...allPosts]})//Object.assign({},state,{ allPosts: action.allPosts, fetched: true })

    case POSTS_FETCH_DATA_SUCCESS:
      //console.log('reducer POSTS_FETCH_DATA_SUCCESS::' + JSON.stringify(allPosts))
      return Object.assign({},state,
                              {allPosts: [
                                ...state.allPosts, 
                                ...allPosts]})//Object.assign({},state,{ allPosts: action.allPosts, fetched: true })
                              

    case POSTS_DELETE_SUCCESS:  
      let newState = state.allPosts.map((m,index)=>{
        if(m.id === action.allPosts.id) {
          let n = Object.assign({},m,action.allPosts)
          return n
        } else {
          return m
        }
        
      })
      //console.log('POSTS_DELETE_SUCCESS:X:' + JSON.stringify(newState))
      return Object.assign({},state,{allPosts: newState})

    /* case POST_GET_DATA_SUCCESS:
      console.log('POST_GET_DATA_SUCCESS:ss:' + JSON.stringify(action.postData))
      return state */
    
    default:
      return state
  }
}

export function postDataFetched(state = {}, action) {
  const { postData, voteData, comment } = action
  switch (action.type) {
    case POST_GET_DATA_SUCCESS:
      //console.log('POST_GET_DATA_SUCCESS:D:' + JSON.stringify(action.postData))
      return Object.assign({}, state, postData) 

    case POST_VOTE_SUCCESS:
      return Object.assign({}, state, voteData)

    case UPDATE_POST_COMMENT_COUNT:
      //console.log('UPDATE_POST_COMMENT_COUNT:U:' + JSON.stringify(state))
      let parentId = comment.parentId
      let postId = state.id
      let updatedComment = state
      if (postId === parentId) {
        updatedComment.commentCount = updatedComment.commentCount + 1
      }
      //console.log('UPDATE_POST_COMMENT_COUNT:U:U:' + JSON.stringify(updatedComment))
      return Object.assign({}, state, updatedComment)
    
    default:
      return state;
  }
}

export function postsHasErrored(state = false, action) {
  switch(action.type) {
    case POSTS_HAS_ERRORED:
      return action.hasErrored;
    
    default:
      return state;
  }
}

export function postIsCreated(state = false, action) {
  switch(action.type) {
    case POST_IS_CREATED:
      //console.log('reducer POST_IS_CREATED::' + JSON.stringify(action.hasCreated))
      return action.hasCreated;
    
    default:
      return state;
  }
}

export function postsIsLoading(state = false, action) {
  switch (action.type) {
    case POSTS_IS_LOADING:
      return action.isLoading; 
    
    default:
      return state;
  }
}

const c_PostsInitialState = {
  categoryPosts: []
}
export function categoryPosts(state=c_PostsInitialState, action) {
  switch(action.type) {
    case CATEGORY_POSTS_FETCH_DATA_SUCCESS:
      //console.log('reducer...' + JSON.stringify(action.categoryPosts))
      return {...state,
              categoryPosts: [
                ...action.categoryPosts
              ]}//Object.assign({}, state, action.categoryPosts)
    default:
      return state
  }
}

export default combineReducers({
  comments,
  commentsIsLoading,
  commentsHasErrored,
  postCommentsFetched,
  postDataFetched,
  commentIsPosting,
  allPosts,
  postsHasErrored,
  postsIsLoading,
  postIsCreated,
  categoryPosts
})