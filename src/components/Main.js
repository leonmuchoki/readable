import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LeftSideBar from './LeftSideBar';
import Posts from './Posts';
import PostsContainer from '../containers/PostsContainer';
import PostDetail from './PostDetail';
import CategoryPosts from './CategoryPosts';
import CreatePost from './CreatePost';
import * as ReadableAPI from '../utils/ReadableAPI';

class Main extends Component {

  render() {
    const categories = this.props.categories
    return (
      <div className='main'>
        <LeftSideBar categories={categories} />
        <Route exact path="/"
                 render={() => ( 
                                  <PostsContainer /> 
                                )} />
        <Route exact path="/:category/posts" component={CategoryPosts} /> 
                              
        <Route path="/post/:id" component={PostDetail} />
        <Route path="/create/post" 
               render={()=> (
                 <CreatePost categories={categories} />
               )} />
      </div>
    )
  }
}

export default Main;