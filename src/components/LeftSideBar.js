import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LeftSideBar extends Component {
  
  render () {
    const categories = this.props.categories

    return (
      <div className="left-side-bar">
        <h3>Category</h3>
        <ul className='category-list'>
          {categories.map((c, index)=>(
            <li key={index} className="category-list-item">
            <Link to={`${c.name}/posts`}>{c.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default LeftSideBar;