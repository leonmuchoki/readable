import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from 'react-loading';

import * as ReadableAPI from '../utils/ReadableAPI';
import Posts from '../components/Posts';
import { getCategoryPosts, postDelete } from '../actions/posts';

class CategoryPosts extends Component {
  
  state = {
    category_posts: []
  }

  componentDidMount() {
    this.getCategoryPosts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.category !== this.props.match.params.category) {
      this.getCategoryPosts();
    }
  }

  getCategoryPosts = () => {
    let category = this.props.match.params.category
    console.log('getCategoryPosts...' + category)
    this.props.fetchCategoryPosts(category)
  }

  render () {
    const { deletePost, categoryPosts, isLoading } = this.props
    //console.log('getCategoryPosts::dP:-- ' + JSON.stringify(this.props.categoryPosts))
    return (
      <div className='Posts'>
        {isLoading === true 
          ? <Loading delay={200} type='spin' color='#222' className="loading-spinner" />
          :
            <Posts allPosts={categoryPosts} deletePost={deletePost} />
        }
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  //console.log('mapStateToProps::categoryPosts:state-- ' + JSON.stringify(state.categoryPosts.categoryPosts))
   return { 
            categoryPosts: state.categoryPosts.categoryPosts,
            isLoading: state.postsIsLoading,
            hasErrored: state.postsHasErrored
          }
 }

const mapDispatchToProps = dispatch => {
  return {
    deletePost: (postId) => dispatch(postDelete(postId)),
    fetchCategoryPosts: (category) => dispatch(getCategoryPosts(category))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryPosts))