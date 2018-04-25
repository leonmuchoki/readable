import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Posts extends Component {
  
  render () {
    const dP = this.props.allPosts;
    return (
      <div className='Posts'>
        <ul>
          {dP.map((p, index)=>(
            <div className="post-item">
              <li key={index} className="header-post-item">
                <Link to={`/post/${ p["id"] }`}>{p["title"]}</Link>
              </li>
            </div>
          ))}
        </ul>
      </div>
    )
  }
}

export default Posts;