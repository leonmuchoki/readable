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


