import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Posts = ({allPosts}) => (
  <div className='posts-wrap'>
    <ul>
      {allPosts !== undefined && allPosts.map((p, index)=>(
        <div className="post-item" key={index}>
          <li key={index} className="header-post-item">
            <Link to={`/post/${ p["id"] }`} key={index}>
              {p["title"]}
            </Link>
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