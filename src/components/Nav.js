import React, { Component } from 'react';

class Nav extends Component {
  render () {
    return (
      <div>
        <div className='nav'>
          <h1 className='header'>Readable</h1>
          <button className='btn-add-post'>Add Post</button>
        </div>
      </div>
    )
  }
}

export default Nav