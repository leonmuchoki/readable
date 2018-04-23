import React, { Component } from 'react';
import LeftSideBar from './LeftSideBar';
import Posts from './Posts';

class Main extends Component {
  getDefaultPosts = () => {
    const defaultData = {
      "8xf0y6ziyjabvozdd253nd": {
        id: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1467166872634,
        title: 'Udacity is the best place to learn React',
        body: 'Everyone says so after all.',
        author: 'thingtwo',
        category: 'react',
        voteScore: 6,
        deleted: false,
        commentCount: 2
      },
      "6ni6ok3ym7mf1p33lnez": {
        id: '6ni6ok3ym7mf1p33lnez',
        timestamp: 1468479767190,
        title: 'Learn Redux in 10 minutes!',
        body: 'Just kidding. It takes more than 10 minutes to learn technology.',
        author: 'thingone',
        category: 'redux',
        voteScore: -5,
        deleted: false,
        commentCount: 0
      }
    }
    var posts = []
    for (var i in defaultData) {
      console.log(i);
      posts.push(defaultData[i]["title"]);
      
    }
    return posts;
  }

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
      <div className='main'>
        <LeftSideBar categories={categories} />
        <Posts getDefaultPosts={this.getDefaultPosts} />
      </div>
    )
  }
}

export default Main;