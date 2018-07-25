import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PlusIcon from 'react-icons/lib/fa/plus';
import ReadableIcon from 'react-icons/lib/fa/book';

class Nav extends Component {
  render () {
    return (
      <div>
        <div className='nav'>
          <h1 className='header'><Link to="/"><ReadableIcon /> Readable</Link></h1>
          <Link to="/create/new/post" className="btn-add-post"><PlusIcon /> Add Post</Link>
          
        </div>
      </div>
    )
  }
}

export default Nav