import React, { Component } from 'react';

class Posts extends Component {
  
  render () {
    const dP = this.props.allPosts;
    return (
      <div className='Posts'>
        <ul>
          {dP.map((p, index)=>(
            <div className="post-item">
              <li key={index} className="header-post-item"><a href="#">{p}</a></li>
            </div>
          ))}
        </ul>
      </div>
    )
  }
}

export default Posts;