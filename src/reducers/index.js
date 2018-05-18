import { combineReducers } from 'redux'

import { ADD_COMMENT, GET_POSTS } from '../actions';

const initialStateComments = {
  comments: {}
}

const addNewComment = (state,comment) => {
  const state_comm = Object.assign({}, state.comments, comment)
  //state_comm["fetched"] = true
  /* const rtn = [...state_comm, ...comment]//Object.assign({}, state.comments, comment.comments)
  const rtnn = Object.assign({}, state, {
    fetched: true,
    comments: comment
  }) */
  
  console.log('reducer...' + JSON.stringify(state_comm))
  return state_comm
}

function comment(state=initialStateComments, action) {
  switch(action.type) {
    case ADD_COMMENT:
      const { comment } = action
      console.log('reducer...' + JSON.stringify(comment))
      return Object.assign({}, state, {comments: comment})
      //addNewComment(state, comment)  
      //}
        //...state,
        //comments: //addNewComment(state,comment)//[...state.comments,...comment]
      
    default:
      return state
  }
}

const postsInitialState = {
  allPosts: [],
  fetched: false
}

function allPosts(state=postsInitialState, action) {
  switch(action.type) {
    case GET_POSTS:
      console.log('reducer post::' + JSON.stringify(action.allPosts))
      const all_posts = [...state.allPosts, ...action.allPosts]
      return Object.assign({},state,{ allPosts: action.allPosts, fetched: true })
    default:
      return state
  }
}

export default combineReducers({
  comment,
  allPosts
})