import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UpVoteIcon from 'react-icons/lib/fa/hand-o-up';

class PostVote extends Component {
  
  render () {
    const count_votes = this.props.countVotes

    return (
      <div className="post-detail-vote-wrap">
        <Link to="/" className="post-detail-comment-link">
          <div className="post-detail-comment-icon"><UpVoteIcon /></div>
          <div className="post-detail-comment-icon-label">
            <span className="post-detail-comment">Vote</span>
            <span className="bullet">.</span>
            {count_votes}
          </div>
        </Link>
      </div>
    )
  }
}

export default PostVote;