import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreateComment from './CreateComment';
import CommentDetail from './CommentDetail';

const Comments = ({comments, postId}) => (
  <div className="comments-wrap">
        <div className="comments-contents-wrap">
          <CreateComment post_id={postId} />
          {comments.length > 0 && (<CommentDetail comments={comments} />)}
          
        </div>
      </div>
);

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired
}

export default Comments;