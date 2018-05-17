export const ADD_COMMENT = 'ADD_COMMENT'

export function addComment(comment) { //{id,timestamp,body,author,parentId,voteScore,deleted,parentDeleted}
 return {
  type: ADD_COMMENT,
  comment
 }
}