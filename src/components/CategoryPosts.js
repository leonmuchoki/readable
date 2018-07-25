import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as ReadableAPI from '../utils/ReadableAPI';
import Posts from '../components/Posts';
import { postsFetchData, postDelete } from '../actions/posts';

class CategoryPosts extends Component {
  
  state = {
    category_posts: []
  }

  componentDidMount() {
    this.getCategoryPosts();
  }

  getCategoryPosts = () => {
    const category = this.props.match.params.category
    console.log('getCategoryPosts...' + category)
    ReadableAPI.getCategoryPosts(category)
                .then((data)=>{
                  this.setState({category_posts: data})
                })
  }

  render () {
    const { deletePost } = this.props
    const dP = this.state.category_posts;
    //console.log('getCategoryPosts::dP:-- ' + JSON.stringify(dP))
    return (
      <div className='Posts'>
        <Posts allPosts={dP} deletePost={deletePost} />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deletePost: (postId) => dispatch(postDelete(postId))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(CategoryPosts))