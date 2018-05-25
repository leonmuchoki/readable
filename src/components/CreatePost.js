import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import serializeForm from 'form-serialize';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as Helpers from '../utils/helpers';
import * as ReadableAPI from '../utils/ReadableAPI';
//import { createNewPost } from '../utils/ReadableAPI';
import { addPostData } from '../actions/posts'

class CreatePost extends Component {

  handleSubmit = (e) => {
    e.preventDefault()   
    const values = serializeForm(e.target, { hash: true })
    const values_to_post = {
      ...values,
      timestamp: Date.now(),
      id: Helpers.uuidv4()
    }
    //console.log('form values...' + JSON.stringify(values_to_post))
    this.createNewPost(values_to_post)
  }

  createNewPost = (values_to_post) => {
    this.props.createPost(values_to_post)
  }

  render() {
    if (this.props.hasCreated === true) {
      return <Redirect to='/' />
    }

    const categories = this.props.categories;

    return (
      <div className="form-wrap">
        <form className="create-post-form" onSubmit={this.handleSubmit}>
          <div>
            <div  className="form-title">
              <span>New Post</span>
            </div>
            <div className="form-inputs-wrap">
              <select className="form-input-select" name="category">
                <option>Select Category</option>
                {categories.map((c, index)=> (
                  <option key={index} value={c.name}>{c.name}</option>
                ))}
              </select>
              <input type="text" name="author" placeholder="add author.." className="form-input" />            
              <input type="text" name="title" placeholder="add title.." className="form-input" />
              <textarea type="text" name="body" placeholder="add post.." className="form-input" ></textarea>             
            </div>
            <button className="form-input-button">Create Post</button>
          </div>
        </form>
      </div>
    )
  }
}

CreatePost.propTypes = {
  createPost: PropTypes.func.isRequired,
  hasCreated: PropTypes.bool.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    createPost: (postData) => dispatch(addPostData(postData))
  }
}

const mapStateToProps = (state) => {
  //console.log('mapStateToProps::allPosts:postDetail-- ' + JSON.stringify(state.postDataFetched))
   return { 
            hasCreated: state.postIsCreated
          }
 }

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)