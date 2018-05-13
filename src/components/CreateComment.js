import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CommentIcon from 'react-icons/lib/fa/comments';
import serializeForm from 'form-serialize';
import * as Helpers from '../utils/helpers';
import * as ReadableAPI from '../utils/ReadableAPI';

class CreateComment extends Component {
  handleSubmit = (e) => {
    const parentId = this.props.post_id
    e.preventDefault()   
    const values = serializeForm(e.target, { hash: true })
    const values_to_post = {
      ...values,
      timestamp: Date.now(),
      id: Helpers.uuidv4(),
      parentId: parentId
    }
    //console.log('form values...' + JSON.stringify(values_to_post))
    this.createNewComment(values_to_post)
  }

  createNewComment = (values_to_post) => {
    ReadableAPI.createNewComment(values_to_post)
                .then(data => (console.log('createNewPost successful...' + JSON.stringify(data) )))
  }

  render () {
    const count_comments = this.props.post_id

    return (
      <div>
        <div className="create-comment-wrap">
          <form  onSubmit={this.handleSubmit}>
            <input type="text" name="author" placeholder="add author.." className="form-input-comment" />
            <input type="text" name="body" placeholder="add comment.." className="form-input-comment" />
            <button className="form-input-button-comment">Comment</button>
          </form>
        </div>
      </div>
    )
  }
}

export default CreateComment;