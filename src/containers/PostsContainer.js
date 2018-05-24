import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from 'react-loading';

import * as ReadableAPI from '../utils/ReadableAPI';
import Posts from '../components/Posts';
//import { getPosts } from '../actions/index';
import { postsFetchData, postDelete } from '../actions/posts';


class PostsContainer extends Component {
  
  componentDidMount() {
      this.getDefaultPosts();
  }

  getDefaultPosts = () => {
    const { allPosts } = this.props
    if (allPosts === undefined || allPosts.length <= 0) {
      this.props.fetchData()
    }  
      
  }

  filterOutDeletedPosts = (allPosts) => {
    return allPosts.filter((p)=>(p.deleted === false))
  }

  render() {
    const { allPosts, isLoading, deletePost } = this.props
    let unDeletedPosts = this.filterOutDeletedPosts(allPosts)
    
    return (
      <div>
        {isLoading === true 
           ? <Loading delay={200} type='spin' color='#222' className="loading-spinner" />
           : <Posts allPosts={unDeletedPosts} deletePost={deletePost} /> }
      </div>
    )
  }
}

PostsContainer.propTypes = {
  fetchData: PropTypes.func.isRequired,
  allPosts: PropTypes.array,
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  deletePost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
 console.log('mapStateToProps::allPosts:state-- ' + JSON.stringify(state.allPosts))
  //console.log('mapStateToProps::fetched: ' + allPosts.fetched)
  return { 
           allPosts: state.allPosts.allPosts,
           isLoading: state.postsIsLoading,
           hasErrored: state.postsHasErrored
         }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(postsFetchData()),
    deletePost: (postId) => dispatch(postDelete(postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer)