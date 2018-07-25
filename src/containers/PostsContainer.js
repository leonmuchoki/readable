import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from 'react-loading';
import { withRouter } from 'react-router-dom'

import * as ReadableAPI from '../utils/ReadableAPI';
import * as Helpers from '../utils/helpers'
import Posts from '../components/Posts';
import SortPosts from '../components/SortPosts'
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
    // filter and sort
    let sortBy = this.props.sortBy
    let sortedPosts
    let filteredPosts = allPosts.filter((p)=>(p.deleted === false))
    if (sortBy !== undefined && sortBy.length > 0) {
      if (sortBy === "score") {
        sortedPosts = filteredPosts.sort(Helpers.compareByScore)
      }
      else if (sortBy === "date") {
        sortedPosts = filteredPosts.sort(Helpers.compareByDate)
      }
    }

    if (sortedPosts === undefined) {
      sortedPosts = filteredPosts
    }
    return sortedPosts
  }

  render() {
    const { allPosts, isLoading, deletePost } = this.props
    let unDeletedPosts = this.filterOutDeletedPosts(allPosts)
    //console.log('unDeletedPosts::allPosts:state-- ' + JSON.stringify(unDeletedPosts))
    return (
      <div>
        <SortPosts />
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
  let all_posts = state.allPosts.allPosts
  const sortBy = state.sortPosts.sortBy

  return { 
           allPosts: all_posts,
           isLoading: state.postsIsLoading,
           hasErrored: state.postsHasErrored,
           sortBy: sortBy
         }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(postsFetchData()),
    deletePost: (postId) => dispatch(postDelete(postId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsContainer))