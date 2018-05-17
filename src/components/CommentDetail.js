import React, { Component } from 'react';
import Moment from 'react-moment';
import * as Helpers from '../utils/helpers';
import PropTypes from 'prop-types';

const CommentDetail = ({comments}) => (
  <div>
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
);

CommentDetail.propTypes = {
  comments: PropTypes.array.isRequired
}

export default CommentDetail;