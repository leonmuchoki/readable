import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LeftSideBar from './LeftSideBar';
import Posts from './Posts';
import PostDetail from './PostDetail';
import CategoryPosts from './CategoryPosts';
import CreatePost from './CreatePost';
import * as ReadableAPI from '../utils/ReadableAPI';

class Main extends Component {
  state = {
    all_posts: []
  }

  componentDidMount() {
    this.getDefaultPosts();
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
                })  
    //console.log('all_maposts' + all_posts)     
  }


  render() {
    const categories = this.props.categories
    return (
      <div className='main'>
        <LeftSideBar categories={categories} />
        <Route exact path="/"
                 render={() => ( 
                                  <Posts allPosts={this.state.all_posts} /> 
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