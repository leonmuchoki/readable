import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LeftSideBar from './LeftSideBar';
//import Posts from './Posts';
import PostsContainer from '../containers/PostsContainer';
import PostDetail from './PostDetail';
import CategoryPosts from './CategoryPosts';
import CreatePost from './CreatePost';

class Main extends Component {

  render() {
    const categories = this.props.categories
    return (
      <div className='main'>
        <LeftSideBar categories={categories} />
          <div className='main-content'>
            <Route exact path="/"
                    render={() => ( 
                                      <PostsContainer /> 
                                    )} />
            <Route exact path="/:category" 
                  render={() => ( 
                    <CategoryPosts /> 
                  )} /> 
                                  
            <Route path="/:category/:id" component={PostDetail} />
            <Route exact path="/create/post" 
                  render={()=> (
                    <CreatePost categories={categories} />
                  )} />
          </div>
        
      </div>
    )
  }
}

export default Main;