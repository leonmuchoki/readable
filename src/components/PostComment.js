import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CommentIcon from 'react-icons/lib/fa/comments';

class PostComment extends Component {
  
  render () {
    const count_comments = this.props.countComments

    return (
      <div>
        <div className="post-detail-comment-wrap">
          <Link to="/" className="post-detail-comment-link">
            <div className="post-detail-comment-icon"><CommentIcon /></div>
            <div className="post-detail-comment-icon-label">
              <span className="post-detail-comment">Comment</span>
              <span aria-hidden="true" className="bullet"> · </span>
              {count_comments}
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default PostComment;