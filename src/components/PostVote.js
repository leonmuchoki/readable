import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import UpVoteIcon from 'react-icons/lib/fa/hand-o-up';
import DownVoteIcon from 'react-icons/lib/fa/hand-o-down';
import { postVote,postsFetchData } from '../actions/posts';
import * as ReadableAPI from '../utils/ReadableAPI';

class PostVote extends Component {
  componentDidMount() {
    //this.props.fetchData()
  }

  votePost = (postId,option_selected) => {
    const post_body = {}
    post_body["option"] = option_selected
    this.props.voteOnPost(postId, post_body)
  }

  render () {
    const postId = this.props.postId
    let countVotes = this.props.countVotes

    return (
      <div className="post-detail-vote-wrap">
        <Link to="#" className="post-detail-comment-link" onClick={ () => this.votePost(postId,"upVote")}>
          <div className="post-detail-comment-icon"><UpVoteIcon /></div>
          <div className="post-detail-comment-icon-label">
            <span className="post-detail-comment">Vote</span>
          </div>
        </Link>
        <Link to="#" className="post-detail-comment-link" onClick={ () => this.votePost(postId,"downVote")}>
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

PostVote.propTypes = {
  postId: PropTypes.string.isRequired,
  countVotes: PropTypes.number,
  voteOnPost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  //console.log('mapStateToProps::allPosts:postVote-- ' + JSON.stringify(state.allPosts))
   //console.log('mapStateToProps::fetched: ' + allPosts.fetched)
   return { 
            allPosts: state.allPosts.allPosts
          }
 }

const mapDispatchToProps = dispatch => {
  return {
    voteOnPost: (postId, postBody) => dispatch(postVote(postId, postBody)),
    fetchData: () => dispatch(postsFetchData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostVote);