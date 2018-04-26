import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ReadableAPI from '../utils/ReadableAPI';

class CategoryPosts extends Component {
  
  state = {
    category_posts: []
  }

  componentDidMount() {
    this.getCategoryPosts();
  }

  getCategoryPosts = () => {
    const category = this.props.match.params.category
    
    ReadableAPI.getCategoryPosts(category)
                .then((data)=>{
                  console.log('CategoryPosts---' + JSON.stringify(data))
                  this.setState({category_posts: data})
                })
  }

  render () {
    const dP = this.state.category_posts;
    return (
      <div className='Posts'>
        <ul>
          {dP.map((p, index)=>(
            <div className="post-item"  key={index}>
              <li key={index} className="header-post-item">
                <Link to={`/post/${ p["id"] }`} key={index}>{p["title"]}</Link>
              </li>
            </div>
          ))}
        </ul>
      </div>
    )
  }
}

export default CategoryPosts;