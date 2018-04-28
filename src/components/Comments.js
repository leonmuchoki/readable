import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ReadableAPI from '../utils/ReadableAPI';

class Comments extends Component {
  
  state = {
    post_comments: []
  }
  componentDidMount() {
    const post_id = this.props.postId
    this.getPostComments(post_id);
  }

  getPostComments = (post_id) => {
    ReadableAPI.getPostComments(post_id)
                .then((data)=> (
                  this.setState({post_comments: data})
                ))
  }

  render () {
    const comments = this.state.post_comments;
    console.log('comments...' + JSON.stringify(comments))
    return (
      <div className="comments-wrap">
        <div className="comments-contents">
          {comments.map((c, index)=> (
            <div key={index}>
              <div className="comment-author">{c["author"]}</div>
              <div className="comment-author-comment">
                <p>{c["body"]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Comments;