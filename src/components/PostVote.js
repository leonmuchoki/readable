import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UpVoteIcon from 'react-icons/lib/fa/hand-o-up';
import DownVoteIcon from 'react-icons/lib/fa/hand-o-down';
import * as ReadableAPI from '../utils/ReadableAPI';

class PostVote extends Component {
  
  votePost = (postId,option) => {
    const post_body = {option: option}
    ReadableAPI.voteOnPost(postId,post_body)
                .then((data)=>(console.log('upvote data...' + JSON.stringify(data))))
  }

  render () {
    const postId = this.props.postId
    let countVotes = this.props.countVotes

    return (
      <div className="post-detail-vote-wrap">
        <Link to="#" className="post-detail-comment-link" onClick={this.votePost(postId,"upVote")}>
          <div className="post-detail-comment-icon"><UpVoteIcon /></div>
          <div className="post-detail-comment-icon-label">
            <span className="post-detail-comment">Vote</span>
          </div>
        </Link>
        <Link to="#" className="post-detail-comment-link" onClick={this.votePost(postId,"downVote")}>
          <div className="post-detail-comment-icon"><DownVoteIcon /></div>
          <div className="post-detail-comment-icon-label">
            <span className="post-detail-comment">DownVote</span>           
          </div>
        </Link>
        <div className="post-detail-comment-link">
           <span className="post-detail-comment-votes"> {countVotes} </span>
        </div>
      </div>
    )
  }
}

export default PostVote;