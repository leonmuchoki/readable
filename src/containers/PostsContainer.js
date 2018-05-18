import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ReadableAPI from '../utils/ReadableAPI';
import Posts from '../components/Posts'

class PostsContainer extends Component {
  state = {
    allPosts: []
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
                  this.setState({allPosts: posts})
                })  
    //console.log('all_maposts' + all_posts)     
  }

  render() {
    return (
      <div>
        <Posts allPosts={this.state.allPosts} />
      </div>
    )
  }
}



export default PostsContainer