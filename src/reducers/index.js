import { ADD_COMMENT } from '../actions';

const initialStateComments = {
  comments: [],
  fetched: false
}

const addNewComment = (state,comment) => {
  const state_comm = state.comments
  //state_comm["fetched"] = true
  const rtn = [...state_comm, ...comment]//Object.assign({}, state.comments, comment.comments)
  const rtnn = Object.assign({}, state, {
    fetched: true,
    comments: comment
  })

  console.log('reducer...' + JSON.stringify(rtnn))
  return rtnn
}

function comment(state=initialStateComments, action) {
  switch(action.type) {
    case ADD_COMMENT:
      const { comment } = action
      //console.log('reducer...' + JSON.stringify(comment))
      return {
        comments: addNewComment(state, comment)  
      //Object.assign({}, state.comments, comment)
        //...state,
        //comments: //addNewComment(state,comment)//[...state.comments,...comment]
      }
    default:
      return state
  }
}

export default comment