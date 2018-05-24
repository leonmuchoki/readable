import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from 'react-loading';

import * as ReadableAPI from '../utils/ReadableAPI';
import Comments from '../components/Comments';
import { commentsFetchData, commentDelete, commentVote } from '../actions/comments';

class CommentsContainer extends Component {

  componentDidMount() {
    const { postId } = this.props
    this.getPostComments(postId)   
  }

  getPostComments = (post_id) => {
    const { postId, postCommentsFetched } = this.props
    if ( postCommentsFetched.isFetched === false || postCommentsFetched.postId !== postId) {
      this.props.fetchData(postId)
    }  
  }

  getParentComments = () => {
    const { comments, postId } = this.props
    let post_comments = []
    if (comments !== undefined) { //comments.hasOwnProperty(postId)
      Object.keys(comments)
            .forEach(function eachKey(key) { 
              //console.log('comments key***' + key)
                if (key === "comments" ) {
                  let comments_arr = comments.comments
                  if (comments_arr !== undefined && comments_arr.length > 0) {
                    post_comments = comments_arr.filter((cmm) => {
                      //console.log('cmm***' + JSON.stringify(cmm))
                      if (cmm !== undefined) {
                        return cmm.parentId === postId
                      }
                      
                    })
                  }
                }
            });
    }
    //console.log(' getParentComments...YER SIR' + postId + ' COMMENTS:: ' + JSON.stringify(post_comments));
    return post_comments//.filter((c)=>(c.parentId === parentId))
  }

  voteOnComment = (commentId, option_selected) => {
    const post_body = {}
    post_body["option"] = option_selected
    this.props.voteComment(commentId, post_body)
  }

  filterOutDeletedComments = (comments) => {
    return comments.filter((c)=>(c.deleted === false))
  }

  render() {
    const {postId, isLoading, addComment, deleteComment} = this.props;

    let post_comments = []
    post_comments = this.getParentComments()//this.props.comments;//this.state.post_comments
    let unDeletedComments = this.filterOutDeletedComments(post_comments)
    
    
    return (
      <div>
        {isLoading === true
         ? <Loading delay={200} type='spin' color='#222' className="loading-spinner" />
         : <Comments comments={unDeletedComments} postId={postId} voteOnComment={this.voteOnComment} deleteComment={deleteComment} />
        } 
      </div>
    )
  }
}

CommentsContainer.propTypes = {
  postId: PropTypes.string.isRequired,
  fetchData: PropTypes.func.isRequired,
  postCommentsFetched: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  deleteComment: PropTypes.func.isRequired,
  voteComment: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    fetchData:  postId => dispatch(commentsFetchData(postId)),
    deleteComment: commentId => dispatch(commentDelete(commentId)),
    voteComment: (commentId, postBody) => dispatch(commentVote(commentId, postBody))
  }
}

const mapStateToProps = (state) => {
  //console.log('mapStateToProps::comments' + JSON.stringify(state.comments) + '----postidComment::' + state.commentsIsLoading)
  return { 
           comments: state.comments,
           postIdComment: '',
           postCommentsFetched: state.postCommentsFetched,
           isLoading: state.commentsIsLoading
         }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);