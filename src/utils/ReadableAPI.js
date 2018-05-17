const api = "http://localhost:3001"

// generate token
let token = localStorage.token
if (!token) {
  token = localStorage.token = Math.random().toString(36).substr(-8)
}

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

// get all posts
export const getAllPosts = () => 
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

// get specific post
export const getPost = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
  .then(res => res.json())
  .then(data => data)

// get all categories
export const getAllCatgories = () => 
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

// get posts for a particular category
export const getCategoryPosts = (category) => 
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

// get post comments
export const getPostComments = (post_id) => 
  fetch(`${api}/posts/${post_id}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)

//  create post /posts
export const createNewPost = (post_body) => 
  fetch(`${api}/posts`, { 
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post_body) 
  })
    .then(res => res.json())
    .then(data => data)

// POST NEW COMMENT
export const createNewComment = (post_body) => 
  fetch(`${api}/comments`, { 
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post_body) 
  })
    .then(res => res.json())
    .then(data => data)

// UPVOTE POST
export const voteOnPost = (postId, post_body) => 
  fetch(`${api}/posts/${postId}`, { 
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post_body)
  })
    .then(res => res.json())
    .then(data => data)

// UPVOTE COMMENT
export const voteOnComment = (postId, post_body) => 
  fetch(`${api}/comments/${postId}`, { 
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post_body)
  })
    .then(res => res.json())
    .then(data => data)