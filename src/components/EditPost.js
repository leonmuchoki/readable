import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import serializeForm from 'form-serialize';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as Helpers from '../utils/helpers';
import * as ReadableAPI from '../utils/ReadableAPI';
//import { createNewPost } from '../utils/ReadableAPI';
import { getCategories,getPostData } from '../actions/posts'

class EditPost extends Component {

  state = {
    title: '',
    author: '',
    body: '',
    category: ''
  }

  componentDidMount() {
    // fetch specific post
    const id = this.props.match.params.id
    console.log('post id edit post::' + id)
    this.getPostData(id)
    this.props.fetchCategories()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.postToEdit !== this.props.postToEdit) {
      //pre-poluate fields
      this.updateFormFields()
    }
  }

  getPostData = (postId) => {
    this.props.fetchPostData(postId)
  }

  updateFormFields = () => {
    let postToEdit = this.props.postToEdit
    
    if (postToEdit !== undefined) {
      console.log('====postToEdit====' + JSON.stringify(postToEdit))
      this.setState({
        title: postToEdit["title"],
        author: postToEdit["author"],
        body: postToEdit["body"],
        category: postToEdit["category"]
      })
    }
  }

  handleInputChange = (event) => {
    let target = event.target
    const el_name = target.name
    this.setState({
      [el_name]: event.target.value
    })
  }

  // submit data
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
              <span>Edit Post</span>
            </div>
            <div className="form-inputs-wrap">
              <select value={this.state.category || ''} onChange={this.handleInputChange} name="category" className="form-input-select" >
                <option value="">Select Category</option>
                { categories !== undefined && categories.map((c, index)=> (
                  <option key={index} value={c.name}>{c.name}</option>
                )) }
              </select>
              <input type="text" name="author" value={this.state.author || ''} 
                     onChange={this.handleInputChange} placeholder="add author.." className="form-input" />            
              <input type="text" name="title" value={this.state.title || ''} 
                     onChange={this.handleInputChange} placeholder="add title.." className="form-input" />
              <textarea type="text" name="body" value={this.state.body || ''} 
                        onChange={this.handleInputChange} placeholder="add post.." className="form-input" ></textarea>             
            </div>
            <button className="form-input-button">Create Post</button>
          </div>
        </form>
      </div>
    )
  }
}

EditPost.propTypes = {
  postId: PropTypes.string,
  hasCreated: PropTypes.bool
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPostData: (postId) => dispatch(getPostData(postId)),
    fetchCategories: () => dispatch(getCategories())
  }
}

const mapStateToProps = (state) => {
  console.log('mapStateToProps::postDataFetched:editPotst-- ' + JSON.stringify(state.getCategories.categories))
   return { 
            postToEdit: state.postDataFetched,
            categories: state.getCategories.categories,
            hasCreated: state.postIsCreated
          }
 }

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)