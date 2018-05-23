import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from 'react-loading';

import * as ReadableAPI from '../utils/ReadableAPI';
import Posts from '../components/Posts';
import { getPosts } from '../actions/index';
import { postsFetchData } from '../actions/index';


class PostsContainer extends Component {
  
  componentDidMount() {
      this.getDefaultPosts();
  }

  getDefaultPosts = () => {
    const { allPosts } = this.props
    if (allPosts === undefined || allPosts.length <= 0) {
      this.props.fetchData()
      /* ReadableAPI.getAllPosts()
                .then((data)=> {
                  const allPosts = {allPosts: data}
                  this.props.getPosts(allPosts)
                })   */
    }  
      
  }

  render() {
    const { allPosts, isLoading } = this.props
    //console.log('allPostsReducer======' + JSON.stringify(allPosts))
    return (
      <div>
        {isLoading === true 
           ? <Loading delay={200} type='spin' color='#222' className="loading-spinner" />
           : <Posts allPosts={allPosts} /> }
      </div>
    )
  }
}

PostsContainer.propTypes = {
  fetchData: PropTypes.func.isRequired,
  allPosts: PropTypes.array,
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
 //console.log('mapStateToProps::allPosts:state-- ' + JSON.stringify(state.allPosts))
  //console.log('mapStateToProps::fetched: ' + allPosts.fetched)
  return { 
           allPosts: state.allPosts.allPosts,
           isLoading: state.postsIsLoading,
           hasErrored: state.postsHasErrored
         }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(postsFetchData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer)