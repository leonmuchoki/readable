import React, { Component } from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';
//import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from 'react-loading';

import PostComment from './PostComment';
import PostVote from './PostVote';
import { getPostData } from '../actions/posts';
import CommentsContainer from '../containers/CommentsContainer';
import * as Helpers from '../utils/helpers';

class PostDetail extends Component {
  state = {
    post_details: {}
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.getPostDetails(id);
  }

  getPostDetails = (id) => {
    this.props.fetchData(id)
  }

  render () {
    //const categories = this.props.categories
    const post_details = this.props.postDetails
    const comment_count = post_details["commentCount"]
    const vote_count = post_details["voteScore"]
    const post_id = this.props.match.params.id
    //console.log('postdetails...' + JSON.stringify(post_details))

    return (
      <div className="post-detail">
        <h3>{post_details["title"]}</h3>
        <div className="post-detail-top">
          <span className="post-detail-author">{post_details["author"]}</span>
          <span className="comments-events-time"><Moment fromNow>{Helpers.getDateFromTimeStamp(post_details["timestamp"])}</Moment></span>
        </div>
        <div className="post-detail-body">
          <span className="post-detail-body-text">{post_details["body"]}</span>
        </div>
        <div className="post-detail-footer">
          <PostComment countComments={comment_count} />
          <PostVote countVotes={vote_count} postId={post_id} />
        </div>
        <div>
            <CommentsContainer postId={post_id} />
        </div>
      </div>
    )
  }
}

PostDetail.propTypes = {
  fetchData: PropTypes.func.isRequired,
  postDetails: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  //console.log('mapStateToProps::allPosts:postDetail-- ' + JSON.stringify(state.postDataFetched))
   //console.log('mapStateToProps::fetched: ' + allPosts.fetched)
   return { 
            postDetails: state.postDataFetched,
            isLoading: state.postsIsLoading,
            hasErrored: state.postsHasErrored
          }
 }

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (postId) => dispatch(getPostData(postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)