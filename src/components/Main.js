import React, { Component } from 'react';
import LeftSideBar from './LeftSideBar';
import Posts from './Posts';
import * as ReadableAPI from '../utils/ReadableAPI';

class Main extends Component {
  state = {
    all_posts: []
  }
  
  getDefaultPosts = () => {
    ReadableAPI.getAllPosts()
                .then((data)=> {
                  //this.allPosts(data)
                  var posts = []
                  data.map((d)=> (posts.push(d["title"])))
                  this.setState({all_posts: posts})
                  console.log('ati all posts...' + posts)
                })  
    //console.log('all_maposts' + all_posts)     
  }

  componentDidMount() {
    this.getDefaultPosts();
  }

  render() {
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
        <Posts allPosts={this.state.all_posts} />
      </div>
    )
  }
}

export default Main;