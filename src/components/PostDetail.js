import React, { Component } from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';

class PostDetail extends Component {
  
  componentDidMount() {
    const id = this.props.id
    console.log(id)
    this.getPostDetails(id);
  }

  getPostDetails = (id) => {
    ReadableAPI.getPost(id).then(data => console.log(data))
  }

  render () {
    const categories = this.props.categories

    return (
      <div className="post-details">
        <h3>Post Details</h3>
      </div>
    )
  }
}

export default PostDetail