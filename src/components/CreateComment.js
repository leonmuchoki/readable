import React, { Component } from 'react';
import Loading from 'react-loading';
//import CommentIcon from 'react-icons/lib/fa/comments';
import serializeForm from 'form-serialize';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as Helpers from '../utils/helpers';
import * as ReadableAPI from '../utils/ReadableAPI';
import  { postNewCommentData } from '../actions/comments';

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
    /* ReadableAPI.createNewComment(values_to_post)
                .then(data => (this.onCommentCreate(data,parentId))) */
    this.props.postCommentData(values_to_post, parentId)
    this.setState({author: '', body: ''})
  }

  onCommentCreate = (comments,postIdComment) => {
    //console.log('updateCommentCreate>>>' + ' postId::' + postIdComment + '----' + JSON.stringify(comments))
    this.props.addComment({comments, postIdComment})
  }

  render () {
    const author = this.state.author
    const body = this.state.body

    return (
      <div>
        <div className="create-comment-wrap">
          {this.props.isPosting === true
           ? <Loading delay={200} type='spin' color='#222' className="loading-spinner" />
           : null
          }
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
  //addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  postCommentData: PropTypes.func.isRequired
  //isPosting: PropTypes.bool.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    //addComment: (data) => dispatch(addComment(data)),
    postCommentData: (data, postId) => dispatch(postNewCommentData(data, postId))
  }
}

const mapStateToProps = (state) => {
  //console.log('mapStateToProps::CREATEcomments' + JSON.stringify(state) + '----postidComment::' + state.commentIsPosting)
  return { 
           isPosting: state.commentIsPosting
         }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment);