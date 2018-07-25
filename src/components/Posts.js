import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DeleteIcon from 'react-icons/lib/fa/trash';
import EditIcon from 'react-icons/lib/fa/pencil';

const Posts = ({allPosts,deletePost}) => (
  <div className='posts-wrap'>
    <ul>
      {allPosts !== undefined && allPosts.map((p, index)=>(
        <div className="post-item" key={index}>
          <h4>{p["author"]}</h4>
          <li key={index} className="header-post-item">
            <Link to={`/${ p["category"] }/${ p["id"] }`} key={index}>
              {p["title"]}
            </Link>
            <span aria-hidden="true" className="bullet"> · </span>
            <span className="posts-delete-icon" ><EditIcon /></span>
            <span aria-hidden="true" className="bullet"> · </span>
            <span className="posts-delete-icon" onClick={()=>deletePost(p["id"])}><DeleteIcon /></span>
          </li>
          <div className="posts-footer">
            <span>Vote<span aria-hidden="true" className="bullet"> · </span>{p["voteScore"]}</span>
            <span>Comment<span aria-hidden="true" className="bullet"> · </span>{p["commentCount"]}</span>
          </div>
        </div>
      ))}
    </ul>
  </div>
)

Posts.propTypes = {
  allPosts: PropTypes.array.isRequired
}

export default Posts;