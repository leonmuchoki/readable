import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DeleteIcon from 'react-icons/lib/fa/trash';

const Posts = ({allPosts,deletePost}) => (
  <div className='posts-wrap'>
    <ul>
      {allPosts !== undefined && allPosts.map((p, index)=>(
        <div className="post-item" key={index}>
          <li key={index} className="header-post-item">
            <Link to={`/post/${ p["id"] }`} key={index}>
              {p["title"]}
            </Link>
            <span aria-hidden="true" className="bullet"> · </span>
            <span className="posts-delete-icon" onClick={()=>deletePost(p["id"])}><DeleteIcon /></span>
          </li>
        </div>
      ))}
    </ul>
  </div>
)

Posts.propTypes = {
  allPosts: PropTypes.array.isRequired
}

export default Posts;