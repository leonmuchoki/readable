import React, { Component } from 'react';
import serializeForm from 'form-serialize';

class CreatePost extends Component {
  handleSubmit = (e) => {
    e.preventDefault()   
    const values = serializeForm(e.target, { hash: true })
    console.log('form values...' + JSON.stringify(values))
  }
  render() {
    return (
      <div className="form-wrap">
        <form className="create-post-form" onSubmit={this.handleSubmit}>
          <div>
            <div  className="form-title">
              <span>New Post</span>
            </div>
            <div className="form-inputs-wrap">
              <select className="form-input-select">
                <option>Select Category</option>
              </select>
              <input type="text" name="author" placeholder="add author.." className="form-input" />            
              <input type="text" name="title" placeholder="add title.." className="form-input" />
              <textarea type="text" name="body" placeholder="add post.." className="form-input" ></textarea>             
            </div>
            <button className="form-input-button">Create Post</button>
          </div>
        </form>
      </div>
    )
  }
}

export default CreatePost