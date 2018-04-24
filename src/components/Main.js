import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LeftSideBar from './LeftSideBar';
import Posts from './Posts';
import PostDetail from './PostDetail';
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
                  data.map((d)=> (
                    posts.push({
                      title: d["title"],
                      id: d["id"]
                    })
                  ))
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
        <Route exact path="/"
                 render={() => ( <Posts allPosts={this.state.all_posts} /> )} />
        <Route path="/post:id" component={PostDetail} />
      </div>
    )
  }
}

export default Main;