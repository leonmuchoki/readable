import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreateComment from './CreateComment';
import CommentDetail from './CommentDetail';

const Comments = ({comments, postId,voteOnComment,addComment}) => (
  <div className="comments-wrap">
        <div className="comments-contents-wrap">
          <CreateComment postId={postId} addComment={addComment} />
          {comments.length > 0 && (<CommentDetail comments={comments} voteOnComment={voteOnComment} />)}
          
        </div>
      </div>
);

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired,
  voteOnComment: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired
}

export default Comments;