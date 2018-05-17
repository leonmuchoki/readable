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
                  //this.setState({post_comments: data})
                  addComment(data)
                })
  }

  getParentComments = () => {
    const parentId = this.props.postId
    const comments = this.props.comments
    //console.log(' getParentComments...' + JSON.stringify(comments));
    return comments//.filter((c)=>(c.parentId === parentId))
  }

  render() {
    const post_comments = this.getParentComments()//this.props.comments;//this.state.post_comments
    const post_id = this.props.postId;

    return (
      <div>
        <Comments comments={post_comments} postId={post_id} />
      </div>
    )
  }
}

CommentsContainer.propTypes = {
  postId: PropTypes.string.isRequired
}

const retrieveComments = (comments) => {
  //const comment_data = Object.values(comments)//Object.entries(comments)[0]//Object.values(comments)
  let comment_data = []
  Object.keys(comments)
  .forEach(function eachKey(key) { 
    if (key=="comments"){
      comment_data = [...comments[key],...comment_data]
      console.log('retrieveComments..keys.' + JSON.stringify(comment_data))     
    }
    //alert(comments[key]); // alerts value
  });
  
  return comment_data
}

const retrieveStatus = (fetched) => {
  Object.keys(fetched)
  .forEach(function eachKey(key) { 
    if (key=="fetched"){
      return fetched[key]
    }
  });
} 

const mapDispatchToProps = dispatch => {
  return {
    addComment: comment => dispatch(addComment(comment))
  }
}

const mapStateToProps = ({comments, fetched}) => {
  return { comments: retrieveComments(comments),
           fetched: retrieveStatus(comments)
         }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);