import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Posts extends Component {
  
  render () {
    const dP = this.props.allPosts;
    return (
      <div className='posts-wrap'>
        <ul>
          {dP.map((p, index)=>(
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
  }
}

export default Posts;