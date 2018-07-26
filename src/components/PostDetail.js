import React, { Component } from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from 'react-loading';
import { Link } from 'react-router-dom';
import EditIcon from 'react-icons/lib/fa/pencil';
import DeleteIcon from 'react-icons/lib/fa/trash';

import PostComment from './PostComment';
import PostVote from './PostVote';
import { getPostData } from '../actions/posts';
import CommentsContainer from '../containers/CommentsContainer';
import * as Helpers from '../utils/helpers';
import NotFound from './NotFound'
import { postDelete } from '../actions/posts';

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

  checkIfErr = (post_details) => {
    if (post_details["error"] !== undefined) {
      return true
    }
    return false
  }

  delPost = (postId) => {
    this.props.deletePost(postId)
    this.props.history.push('/')
  }

  render () {
    //const categories = this.props.categories
    const post_details = this.props.postDetails
    let check_if_err = this.checkIfErr(post_details)
    
    const comment_count = post_details["commentCount"]
    const vote_count = post_details["voteScore"]
    const post_id = this.props.match.params.id
    let deletePost = this.props.deletePost
    console.log('postdetails...' + JSON.stringify(post_id))

    return (
      <div className="post-detail">
        {Object.keys(post_details).length > 0 && post_details["title"] !== undefined
          ?
            <div>
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

                <span aria-hidden="true" className="bullet"> · </span>
                <Link to={`/post/edit/${ post_details["id"] }`}>
                  <span className="posts-delete-icon" ><EditIcon /></span>
                </Link>

                <span aria-hidden="true" className="bullet"> · </span>
                <span className="posts-delete-icon" onClick={()=>this.delPost(post_details["id"])}><DeleteIcon /></span>
              </div>
              <div>
                  <CommentsContainer postId={post_id} />
              </div>
            </div>
          : <NotFound />
        }
        
      </div>
    )
  }
}

PostDetail.propTypes = {
  fetchData: PropTypes.func.isRequired,
  postDetails: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  console.log('mapStateToProps::allPosts:postDetail-- ' + JSON.stringify(state.postDataFetched))
   //console.log('mapStateToProps::fetched: ' + allPosts.fetched)
   return { 
            postDetails: state.postDataFetched,
            isLoading: state.postsIsLoading,
            hasErrored: state.postsHasErrored
          }
 }

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (postId) => dispatch(getPostData(postId)),
    deletePost: (postId) => dispatch(postDelete(postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)