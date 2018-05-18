import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as ReadableAPI from '../utils/ReadableAPI';
import Posts from '../components/Posts';
import { getPosts } from '../actions/index';
//import { getPost } from '../utils/ReadableAPI';


class PostsContainer extends Component {
  state = {
    allPosts: []
  }

  componentDidMount() {
    const fetched = this.props.fetched
    console.log('componentDidMount fetched::' + fetched)
    if (fetched === undefined || fetched === false) {
      this.getDefaultPosts();
    }
  }

  getDefaultPosts = () => {
    ReadableAPI.getAllPosts()
                .then((data)=> {
                  var posts = []
                  data.map((d)=> (
                    posts.push({
                      title: d["title"],
                      id: d["id"]
                    })
                  ))
                  const all_posts = {allPosts: posts}
                  const fetched = true
                  this.props.getPosts(all_posts)
                  this.setState({allPosts: posts})
                  console.log('all_posts-----' + JSON.stringify(this.state.allPosts))
                })  
      
  }

  render() {
    const allPostsReducer = this.props.allPostsReducer
    console.log('allPostsReducer======' + JSON.stringify(allPostsReducer))
    return (
      <div>
        <Posts allPosts={allPostsReducer} />
      </div>
    )
  }
}

const mapStateToProps = ({allPosts}) => {
  console.log('mapStateToProps::allPosts: ' + JSON.stringify(allPosts))
  console.log('mapStateToProps::fetched: ' + allPosts.fetched)
  return { 
           allPostsReducer: allPosts.allPosts,
           fetched: allPosts.fetched
         }
}

const mapDispatchToProps = dispatch => {
  return {
    getPosts: posts => dispatch(getPosts(posts))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer)