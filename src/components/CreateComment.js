import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CommentIcon from 'react-icons/lib/fa/comments';
import serializeForm from 'form-serialize';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as Helpers from '../utils/helpers';
import * as ReadableAPI from '../utils/ReadableAPI';
import  { addComment } from '../actions/index';

class CreateComment extends Component {
  state = {
    author: '',
    body: ''
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (e) => {
    const parentId = this.props.postId
    e.preventDefault()   
    const values = serializeForm(e.target, { hash: true })
    const values_to_post = {
      ...values,
      timestamp: Date.now(),
      id: Helpers.uuidv4(),
      parentId: parentId
    }
    //console.log('form values...' + JSON.stringify(values_to_post))
    this.createNewComment(values_to_post,parentId)
  }

  createNewComment = (values_to_post,parentId) => {
    ReadableAPI.createNewComment(values_to_post)
                .then(data => (this.onCommentCreate(data,parentId)))
    this.setState({author: '', body: ''})
  }

  onCommentCreate = (data,parentId) => {
    const post_comments = {}
    post_comments[parentId] = {comments: data, fetched: true}
    console.log('updateCommentCreate>>>' + JSON.stringify(post_comments))
    this.props.addComment(data)
  }

  render () {
    const author = this.state.author
    const body = this.state.body

    return (
      <div>
        <div className="create-comment-wrap">
          <form  onSubmit={this.handleSubmit}>
            <input type="text" name="author" placeholder="add author.."
                   className="form-input-comment" value={author} onChange={this.handleChange} />
            <textarea type="text" name="body" placeholder="add comment.." 
                      className="form-input-comment" value={body}  onChange={this.handleChange} />
            <button className="form-input-button-comment">Comment</button>
          </form>
        </div>
      </div>
    )
  }
}

CreateComment.propTypes = {
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
}

/* const mapDispatchToProps = dispatch => {
  return {
    addComment: (data) => dispatch(addComment(data))
  }
} */

export default CreateComment//connect(null, mapDispatchToProps)(CreateComment);