import React, { Component } from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';

class PostDetail extends Component {
  state = {
    post_details: {}
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.getPostDetails(id);
  }

  getPostDetails = (id) => {
    ReadableAPI.getPost(id)
                .then(data => {
                  this.setState({
                    post_details: data
                  })
                })
  }

  render () {
    const categories = this.props.categories
    const post_details = this.state.post_details
    
    return (
      <div className="post-detail">
        <h3>{post_details["title"]}</h3>
        <div className="post-detail-top">
          <span className="post-detail-author">{post_details["author"]}</span>
        </div>
        <div className="post-detail-body">
          <span className="post-detail-body-text">{post_details["body"]}</span>
        </div>
      </div>
    )
  }
}

export default PostDetail