import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import * as ReadableAPI from '../utils/ReadableAPI';
import * as Helpers from '../utils/helpers';
import CreateComment from './CreateComment';

class Comments extends Component {
  
  state = {
    post_comments: []
  }
  componentDidMount() {
    const post_id = this.props.postId
    this.getPostComments(post_id);
  }

  getPostComments = (post_id) => {
    ReadableAPI.getPostComments(post_id)
                .then((data)=> (
                  this.setState({post_comments: data})
                ))
  }


  render () {
    const comments = this.state.post_comments;
    const postId = this.props.postId
    //console.log('comments...' + JSON.stringify(comments))
    return (
      <div className="comments-wrap">
        <div className="comments-contents-wrap">
          <CreateComment post_id={postId} />
          {comments.map((c, index)=> (
            <div key={index}>
              <div className="comments-contents">
                <div className="comment-author">{c["author"]}</div>
                <div className="comment-author-comment">
                  <p>{c["body"]}</p>
                </div>
              </div>
              <div className="comments-events">
                <span className="comments-events-vote">Vote</span>
                <span aria-hidden="true" className="bullet"> · </span>
                <span className="comments-events-time"><Moment fromNow>{Helpers.getDateFromTimeStamp(c["timestamp"])}</Moment></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Comments;