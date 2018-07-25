import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from 'react-loading';
import { withRouter } from 'react-router-dom'

import * as ReadableAPI from '../utils/ReadableAPI';
import Posts from '../components/Posts';
//import { getPosts } from '../actions/index';
import { postsFetchData, postDelete } from '../actions/posts';


class PostsContainer extends Component {
  
  componentDidMount() {
      this.getDefaultPosts();
  }

  getDefaultPosts = () => {
    //console.log('----getDefaultPosts()---')
    const { allPosts } = this.props
    //console.log('----getDefaultPosts()---' + JSON.stringify(allPosts))
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
    //console.log('unDeletedPosts::allPosts:state-- ' + JSON.stringify(unDeletedPosts))
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
 console.log('mapStateToProps::sortPosts:state-- ' + JSON.stringify(state.allPosts.allPosts))
  //console.log('mapStateToProps::fetched: ' + allPosts.fetched)
  const sortBy = state.sortPosts.sortBy
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsContainer))