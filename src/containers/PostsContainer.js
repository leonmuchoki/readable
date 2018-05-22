import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as ReadableAPI from '../utils/ReadableAPI';
import Posts from '../components/Posts';
import { getPosts } from '../actions/index';
//import { getPost } from '../utils/ReadableAPI';


class PostsContainer extends Component {
  
  componentDidMount() {
      this.getDefaultPosts();
  }

  getDefaultPosts = () => {
    const { allPostsReducer } = this.props
    if (allPostsReducer === undefined || allPostsReducer.length <= 0) {
      ReadableAPI.getAllPosts()
                .then((data)=> {
                  const allPosts = {allPosts: data}
                  this.props.getPosts(allPosts)
                })  
    }  
      
  }

  render() {
    const allPosts = this.props.allPostsReducer
    //console.log('allPostsReducer======' + JSON.stringify(allPosts))
    return (
      <div>
        {allPosts.length > 0 
           ? <Posts allPosts={allPosts} />
           : null }
      </div>
    )
  }
}

const mapStateToProps = ({allPosts}) => {
 // console.log('mapStateToProps::allPosts: ' + JSON.stringify(allPosts))
 // console.log('mapStateToProps::fetched: ' + allPosts.fetched)
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