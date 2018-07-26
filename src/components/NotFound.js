import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import HomeIcon from 'react-icons/lib/fa/home';

class NotFound extends Component {
  render() {
    return (
      <div>
        <h4>Error 404 - Post not found.</h4>
        <Link to="/" className="btn-add-post"><HomeIcon /> Home</Link>
      </div>
    )
  }
}

export default NotFound