import React, { Component } from 'react';

class LeftSideBar extends Component {
  
  render () {
    const categories = [
      {
        name: 'react',
        path: 'react'
      },
      {
        name: 'redux',
        path: 'redux'
      },
      {
        name: 'udacity',
        path: 'udacity'
      }
    ]

    return (
      <div>
        <ul className='category-list'>
          {categories.map((c, index)=>(
            <li key={index}>{c.name}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default LeftSideBar;