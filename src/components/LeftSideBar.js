import React, { Component } from 'react';

class LeftSideBar extends Component {
  
  render () {
    const categories = this.props.categories

    return (
      <div className="left-side-bar">
        <h3>Category</h3>
        <ul className='category-list'>
          {categories.map((c, index)=>(
            <li key={index} className="category-list-item"><a href="#">{c.name}</a></li>
          ))}
        </ul>
      </div>
    )
  }
}

export default LeftSideBar;