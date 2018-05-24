import React from 'react';
import PropTypes from 'prop-types';
import CreateComment from './CreateComment';
import CommentDetail from './CommentDetail';

const Comments = ({comments, postId,voteOnComment,deleteComment}) => (
  <div className="comments-wrap">
        <div className="comments-contents-wrap">
          <CreateComment postId={postId} />
          {comments.length > 0 && (<CommentDetail comments={comments} voteOnComment={voteOnComment} deleteComment={deleteComment} />)}
          
        </div>
      </div>
);

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired,
  voteOnComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired
}

export default Comments;