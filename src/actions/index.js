export const ADD_COMMENT = 'ADD_COMMENT'
export const GET_COMMENTS = 'GET_COMMENTS'
export const GET_POSTS = 'GET_POSTS'
export const ADD_NEW_POST = 'ADD_NEW_POST'

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
  }
}