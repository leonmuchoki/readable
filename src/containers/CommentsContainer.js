import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from 'react-loading';

import * as ReadableAPI from '../utils/ReadableAPI';
import Comments from '../components/Comments';
import { commentsFetchData } from '../actions/comments';

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

  voteOnComment = (commentId,option) => {
    const post_body = {option: option}
    ReadableAPI.voteOnComment(commentId,post_body)
      .then((data)=>{})
  }

  render() {
    let post_comments = []
    post_comments = this.getParentComments()//this.props.comments;//this.state.post_comments
    const {postId, isLoading, addComment} = this.props;
    
    return (
      <div>
        {isLoading === true
         ? <Loading delay={200} type='spin' color='#222' className="loading-spinner" />
         : <Comments comments={post_comments} postId={postId} voteOnComment={this.voteOnComment} addComment={addComment} />
        } 
      </div>
    )
  }
}

CommentsContainer.propTypes = {
  postId: PropTypes.string.isRequired,
  fetchData: PropTypes.func.isRequired,
  postCommentsFetched: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    //getComments: comments => dispatch(getComments(comments)), 
    //addComment: comments => dispatch(addComment(comments)),
    fetchData:  postId => dispatch(commentsFetchData(postId))
  }
}

const mapStateToProps = (state) => {
  //console.log('mapStateToProps::comments' + JSON.stringify(state) + '----postidComment::' + state.commentsIsLoading)
  return { 
           comments: state.comments,//comments,
           postIdComment: '',//postIdComment
           postCommentsFetched: state.postCommentsFetched,
           isLoading: state.commentsIsLoading
         }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);