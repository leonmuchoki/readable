import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PlusIcon from 'react-icons/lib/fa/plus';

class Nav extends Component {
  render () {
    return (
      <div>
        <div className='nav'>
          <h1 className='header'><Link to="/">Readable</Link></h1>
          <button className='btn-add-post'>
            <PlusIcon /> Add Post
          </button>
        </div>
      </div>
    )
  }
}

export default Nav