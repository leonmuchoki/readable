import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ReadableAPI from '../utils/ReadableAPI';
import Comments from '../components/Comments';
import PropTypes from 'prop-types';
import { addComment } from '../actions/index';

class CommentsContainer extends Component {
  
  componentDidMount() {
    const {postId, fetched} = this.props
    console.log('componentDidMount..' + fetched)
    this.getPostComments(postId)
  }

  getPostComments = (post_id) => {
    const {postId} = this.props
    this.fetchComments(postId)
  }

  fetchComments = (postId) => {
    const {addComment} = this.props
    ReadableAPI.getPostComments(postId)
                .then((data)=> {
                  const post_comments = {}
                  post_comments[postId] = {comments: data, fetched: true}
                  console.log('fetchComments<<>>' + JSON.stringify(post_comments))
                  addComment(post_comments)
                })
  }

  getParentComments = () => {
    const {postId, all_comments} = this.props
    let post_comment = []
    if (all_comments !== undefined) {
      Object.keys(all_comments)
          .forEach(function eachKey(key) { 
            if (key==postId){
              post_comment = [...post_comment,...all_comments[key]["comments"]]
              //post_comment.push(all_comments[key]["comments"])           
            }
            //alert(comments[key]); // alerts value
          });
    }
    
    console.log(' getParentComments...' + JSON.stringify(post_comment));
    return post_comment//.filter((c)=>(c.parentId === parentId))
  }

  voteOnComment = (commentId,option) => {
    const post_body = {option: option}
    ReadableAPI.voteOnComment(commentId,post_body)
      .then((data)=>(console.log('voteONComment' + JSON.stringify(data))))
  }

  render() {
    const post_comments = this.getParentComments()//this.props.comments;//this.state.post_comments
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
    addComment: comment => dispatch(addComment(comment))
  }
}

const mapStateToProps = ({comments}) => {
  console.log('mapStateToProps::' + JSON.stringify(comments))
  return { 
           all_comments: comments
         }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);