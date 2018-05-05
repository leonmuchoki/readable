import React, { Component } from 'react';
import serializeForm from 'form-serialize';
import * as Helpers from '../utils/helpers';
import * as ReadableAPI from '../utils/ReadableAPI';
import { createNewPost } from '../utils/ReadableAPI';

class CreatePost extends Component {
  
  handleSubmit = (e) => {
    e.preventDefault()   
    const values = serializeForm(e.target, { hash: true })
    const values_to_post = {
      ...values,
      timestamp: Date.now(),
      id: Helpers.uuidv4()
    }
    //console.log('form values...' + JSON.stringify(values_to_post))
    this.createNewPost(values_to_post)
  }

  createNewPost = (values_to_post) => {
    ReadableAPI.createNewPost(values_to_post)
                .then(data => (console.log('createNewPost successful...' )))
  }

  render() {
    const categories = this.props.categories;

    return (
      <div className="form-wrap">
        <form className="create-post-form" onSubmit={this.handleSubmit}>
          <div>
            <div  className="form-title">
              <span>New Post</span>
            </div>
            <div className="form-inputs-wrap">
              <select className="form-input-select" name="category">
                <option>Select Category</option>
                {categories.map((c, index)=> (
                  <option key={index} value={c.name}>{c.name}</option>
                ))}
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