import { combineReducers } from 'redux'

import { ADD_COMMENT, GET_POSTS, ADD_NEW_POST, GET_COMMENTS,POSTS_FETCH_DATA_SUCCESS,
  POSTS_IS_LOADING,POSTS_HAS_ERRORED } from '../actions';

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

    default:
      return state
  }
}

const postsInitialState = {
  allPosts: [],
  fetched: false
}

function allPosts(state=postsInitialState, action) {
  const { allPosts, post } = action
  switch(action.type) {
    case ADD_NEW_POST:
      return Object.assign({},state,
                                  {allPosts: [
                                    ...state.allPosts, post
                                  ]})//Object.assign({},state,action.post )//Object.assign({},state,{ ...state.allPosts, ...action.post })

    case GET_POSTS:
      console.log('reducer post::' + JSON.stringify(allPosts))
      return Object.assign({},state,
                              {allPosts: [
                                ...state.allPosts, 
                                ...allPosts]})//Object.assign({},state,{ allPosts: action.allPosts, fetched: true })

    case POSTS_FETCH_DATA_SUCCESS:
    console.log('reducer POSTS_FETCH_DATA_SUCCESS::' + JSON.stringify(allPosts))
    return Object.assign({},state,
                            {allPosts: [
                              ...state.allPosts, 
                              ...allPosts]})//Object.assign({},state,{ allPosts: action.allPosts, fetched: true })
                          
    default:
      return state
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

export function postsIsLoading(state = false, action) {
  switch (action.type) {
    case POSTS_IS_LOADING:
      return action.isLoading; 
    
    default:
      return state;
  }
}

export default combineReducers({
  comments,
  allPosts,
  postsHasErrored,
  postsIsLoading
})