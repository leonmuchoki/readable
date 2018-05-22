import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as ReadableAPI from '../utils/ReadableAPI';
import Comments from '../components/Comments';
import { getComments, addComment } from '../actions/index';

class CommentsContainer extends Component {

  componentDidMount() {
    const { postId } = this.props
    this.getPostComments(postId)   
  }

  getPostComments = (post_id) => {
    const { postId, comments } = this.props
    if (comments.comments.length > 0) {
      //console.log('checkIfFetched... ..YES SIR: ' + postId)
    } else {
      //console.log('checkIfFetched... ..NO SIR: ' + postId)
      this.fetchComments(postId)
    } 
  }

  fetchComments = (postId) => {
    ReadableAPI.getPostComments(postId)
      .then((data)=> {
        //console.log('fecthcomments on a sunday ' + JSON.stringify(data))
        const comments = {comments: data}
        this.saveComments(data)
      })
  }

  saveComments = (comments) => {
    const getComments = this.props.getComments
    const postIdComment = this.props.postId
    //console.log('saveComments on a monday---->' + postIdComment)
    if (comments !== undefined && comments.length > 0) {
      getComments({comments, postIdComment})
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
                  post_comments = comments.comments.filter((cmm) => {
                    //console.log('cmm***' + cmm.parentId)
                    return cmm.parentId === postId
                  })
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
    const post_id = this.props.postId;
    const addComment = this.props.addComment;
    
    return (
      <div>
        <Comments comments={post_comments} postId={post_id} voteOnComment={this.voteOnComment} addComment={addComment} />
      </div>
    )
  }
}

CommentsContainer.propTypes = {
  postId: PropTypes.string.isRequired
}


const mapDispatchToProps = dispatch => {
  return {
    getComments: comments => dispatch(getComments(comments)), 
    addComment: comments => dispatch(addComment(comments))
  }
}

const mapStateToProps = ({comments, postIdComment}) => {
  //console.log('mapStateToProps::comments' + JSON.stringify(comments) + '----postidComment::' + comments.postIdComment)
  return { 
           comments: comments,
           postIdComment: postIdComment
         }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);