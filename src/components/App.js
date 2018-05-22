import React, { Component } from 'react';
//import { Route } from 'react-router-dom';
import * as ReadableAPI from '../utils/ReadableAPI';
import Nav from './Nav';
import Main from './Main';


class App extends Component {

  state = {
    categories: []
  }
  componentDidMount() {
    this.getCategories();
  }

  getCategories = () => {
    ReadableAPI.getAllCatgories()
                .then((data)=> {
                  this.setState({categories: data})
                })
  }
  render() {
    return (
      <div className='container'>
        <Nav />
        <div className="main-body-container">
          <Main categories={this.state.categories} />
        </div>
      </div>
    );
  }
}

export default App;
