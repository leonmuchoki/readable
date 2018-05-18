export const ADD_COMMENT = 'ADD_COMMENT'
export const GET_POSTS = 'GET_POSTS'

export function addComment(comment) { //{id,timestamp,body,author,parentId,voteScore,deleted,parentDeleted}
 return {
  type: ADD_COMMENT,
  comment
 }
}

export function getPosts(posts) {
  return {
    type: GET_POSTS,
    posts
  }
}